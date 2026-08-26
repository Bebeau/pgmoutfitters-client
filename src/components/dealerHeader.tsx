import { dealerType } from '../assets/data/dealers';
import { dealerDirectionsUrl, dealerMapsEmbedUrl } from '../utils/dealerAddress';
import { dealerWebsiteUrl } from '../utils/siteMeta';
import DealerAddressLink from './dealerAddressLink';

type dealerHeaderType = {
  dealer: dealerType;
};

const DealerHeader = ({ dealer }: dealerHeaderType) => {
  const website = dealerWebsiteUrl(dealer.link);

  return (
    <div className="dealerHeader contentWrap">
      <div className="dealerInfo">
        <h1>{dealer.name}</h1>
        <DealerAddressLink address={dealer.address} />
        <a
          href={dealerDirectionsUrl(dealer.address)}
          target="_blank"
          rel="noreferrer"
          className="btn outline"
        >
          Get Directions
        </a>
        <br />
        {website ? (
          <a
            className="btn"
            href={website}
            target="_blank"
            rel="noreferrer"
          >
            View Website
          </a>
        ) : null}
      </div>

      <iframe
        className="dealerMap"
        title={`Map of ${dealer.name}`}
        src={dealerMapsEmbedUrl(dealer.address)}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
    </div>
  );
};

export default DealerHeader;
