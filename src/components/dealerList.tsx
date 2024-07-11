import { useState, useRef } from 'react'
import { dealerData } from "../assets/data/dealers"
import PinIcon from '../assets/img/icons/png/pin.png'

import { ReactComponent as Map } from '../assets/img/texas.svg'

const formatAddress = (address: {
    street: string,
    city: string,
    state: string,
    zip: string
}) => {
    return (
        <a href={`https://www.google.com/maps/dir/?api=1&origin=Current+Location&destination=${address.street + ' ' + address.city + ' ' + address.state + ' ' + address.zip}`}>
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
        <div className="footerWrap dealerWrap">
            <div className="map">
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
                                <h4>{dealer.name}</h4>
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
