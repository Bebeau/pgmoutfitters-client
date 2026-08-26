import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { dealerData } from '../assets/data/dealers';
import { productType } from '../assets/data/products';
import {
  dealerCanonical,
  dealerPageDescription,
  dealerPageTitle,
  dealerWebsiteUrl,
} from '../utils/siteMeta';
import DealerHeader from './dealerHeader';
import DealerNotFound from './dealerNotFound';
import PageHelmet from './pageHelmet';
import ProductListing from './productListing';

type dealerPageType = {
  productData: productType[];
};

const DealerPage = (props: dealerPageType) => {
  const { slug } = useParams();
  const dealer = dealerData.find((item) => item.slug === slug);
  const website = dealer ? dealerWebsiteUrl(dealer.link) : undefined;

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
    jsonLd.sameAs = website;
  }

  return (
    <div className="dealerPage">
      <PageHelmet title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <DealerHeader dealer={dealer} />
      <ProductListing products={props.productData} />
    </div>
  );
};

export default DealerPage;
