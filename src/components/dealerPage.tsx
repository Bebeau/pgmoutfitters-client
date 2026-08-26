import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { dealerData } from '../assets/data/dealers';
import { productType } from '../assets/data/products';
import PinIcon from '../assets/img/icons/png/pin.png';
import {
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
  isAbsoluteHttpUrl,
} from '../utils/siteMeta';
import { dealerDirectionsUrl, dealerMapsEmbedUrl } from '../utils/dealerAddress';
import DealerNotFound from './dealerNotFound';
import PageHelmet from './pageHelmet';
import ProductListing from './productListing';

type dealerPageType = {
  openInquiry: () => void;
  productData: productType[];
};

const DealerPage = (props: dealerPageType) => {
  const { slug } = useParams();
  const dealer = dealerData.find((item) => item.slug === slug);
  const website = dealer && isAbsoluteHttpUrl(dealer.link) ? dealer.link : undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!dealer) {
    return <DealerNotFound />;
  }

  const title = dealerPageTitle(dealer.name);
  const description = dealerPageDescription(
    dealer.name,
    dealer.address.city,
    dealer.address.state
  );
  const canonical = dealerCanonical(dealer.slug);
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: dealer.name,
    url: canonical,
    address: {
      '@type': 'PostalAddress',
      streetAddress: dealer.address.street,
      addressLocality: dealer.address.city,
      addressRegion: dealer.address.state,
      postalCode: dealer.address.zip,
    },
  };

  if (website) {
    jsonLd.website = website;
  }

  return (
    <div className="dealerPage">
      <PageHelmet title={title} description={description} canonical={canonical} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="dealerHeader contentWrap">
        <h1>{dealer.name}</h1>
        <a
          href={dealerDirectionsUrl(dealer.address)}
          target="_blank"
          rel="noreferrer"
        >
          <div className="addressWrap">
            <div className="icon">
              <img src={PinIcon} alt="" />
            </div>
            <address>
              {dealer.address.street}
              <br />
              {dealer.address.city}, {dealer.address.state} {dealer.address.zip}
            </address>
          </div>
        </a>
        {website ? (
          <a
            className="dealerWebsite"
            href={website}
            target="_blank"
            rel="noreferrer"
          >
            Website
          </a>
        ) : null}
        <iframe
          className="dealerMap"
          title={`Map of ${dealer.name}`}
          src={dealerMapsEmbedUrl(dealer.address)}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
      <ProductListing
        openInquiry={props.openInquiry}
        products={props.productData}
      />
    </div>
  );
};

export default DealerPage;
