import { dealerType } from '../assets/data/dealers';
import { dealerMapsEmbedUrl } from '../utils/dealerAddress';
import { dealerWebsiteUrl } from '../utils/siteMeta';
import DealerAddressLink from './dealerAddressLink';

type dealerHeaderType = {
  dealer: dealerType;
};

const DealerHeader = ({ dealer }: dealerHeaderType) => {
  const website = dealerWebsiteUrl(dealer.link);

  return (
    <div className="dealerHeader contentWrap">
      <h1>{dealer.name}</h1>
      <DealerAddressLink address={dealer.address} />
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
  );
};

export default DealerHeader;
