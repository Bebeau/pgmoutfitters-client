import { dealerAddressType } from '../assets/data/dealers';
import PinIcon from '../assets/img/icons/png/pin.png';
import { dealerDirectionsUrl } from '../utils/dealerAddress';

type dealerAddressLinkType = {
  address: dealerAddressType;
};

const DealerAddressLink = ({ address }: dealerAddressLinkType) => {
  return (
    <a href={dealerDirectionsUrl(address)} target="_blank" rel="noreferrer">
      <div className="addressWrap">
        <div className="icon">
          <img src={PinIcon} alt="" />
        </div>
        <address>
          {address.street}
          <br />
          {address.city}, {address.state} {address.zip}
        </address>
      </div>
    </a>
  );
};

export default DealerAddressLink;
