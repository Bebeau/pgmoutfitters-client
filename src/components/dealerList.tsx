import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dealerData } from "../assets/data/dealers"
import PinIcon from '../assets/img/icons/png/pin.png'
import { dealerDirectionsUrl } from '../utils/dealerAddress'
import { dealerPath } from '../utils/dealerPath'

import { ReactComponent as Map } from '../assets/img/map.svg'

const formatAddress = (address: {
    street: string,
    city: string,
    state: string,
    zip: string
}) => {
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
    )
}

const DealerList = () => {
    const [activeDealer, setActiveDealer] = useState(0)

    return(
        <>
        <h3>Dealers</h3>
        <div className="dealerWrap">
            <div className="map">
                <div className="headquarters">★</div>
                {
                    dealerData &&
                    dealerData.length > 0 &&
                    dealerData.map((dealer, index) => {
                        let pinStyles = {
                            'top': `${dealer.position.top}%`,
                            'left': `${dealer.position.left}%`,
                        }
                        return(
                            <div 
                                key={`dealer-${index}`}
                                className={activeDealer === index ? 'dealerPin active' : 'dealerPin'}
                                style={pinStyles}
                                onMouseOver={() => setActiveDealer(index)}
                            />
                        )
                    })
                }
                <Map />
            </div>
            <div className='copyWrap dealerList'>
                {
                    dealerData &&
                    dealerData.length > 0 &&
                    dealerData.map((dealer, index) => {
                        return(
                            <div 
                            key={`dealer-${index}`}
                            className={activeDealer === index ? 'dealerBlock active' : 'dealerBlock'}
                            onMouseOver={() => setActiveDealer(index)}>
                                <h4>
                                    <Link to={dealerPath(dealer.slug)}>{dealer.name}</Link>
                                </h4>
                                {formatAddress(dealer.address)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
        </>
    )
}

export default DealerList
