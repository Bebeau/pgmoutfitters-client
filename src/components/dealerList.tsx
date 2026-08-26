import { useState } from 'react'
import { Link } from 'react-router-dom'
import { dealerData } from "../assets/data/dealers"
import { dealerPath } from '../utils/dealerPath'
import DealerAddressLink from './dealerAddressLink'

import { ReactComponent as Map } from '../assets/img/map.svg'

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
                                <DealerAddressLink address={dealer.address} />
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
