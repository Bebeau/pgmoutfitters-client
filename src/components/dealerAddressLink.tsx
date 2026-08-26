import { dealerAddressType } from '../assets/data/dealers';
import PinIcon from '../assets/img/icons/png/pin.png';

type dealerAddressLinkType = {
  address: dealerAddressType;
};

const DealerAddressLink = ({ address }: dealerAddressLinkType) => {
  return (
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
  );
};

export default DealerAddressLink;
