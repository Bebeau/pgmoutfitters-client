import { dealerAddressType } from '../assets/data/dealers';
import PinIcon from '../assets/img/icons/png/pin.png';

type dealerAddressProps = {
  address: dealerAddressType;
};

const DealerAddress = ({ address }: dealerAddressProps) => {
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

export default DealerAddress;
