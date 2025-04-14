import React from 'react';
import {productType} from '../assets/data/products';

type productSpecsType = {
    productInfo: productType,
    openInquiry: () => void
}
const ProductSpecs = (props: productSpecsType) => {

    const handleBtnClick = () => {
        window.gtag('event', 'productSpecsCTA');
        props.openInquiry();
    }

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
    });

    return (
        <div className="content">

            <div className="blueprint">
                <img src={props.productInfo.blueprint} alt='blueprint' />
            </div>

            <div className="about">
                
                <div className="image">
                    <img src={props.productInfo.image} alt='' />
                </div>

                <div className="desc">

                    {props.productInfo.name === 'Special Ops 2-N-1' || props.productInfo.name === 'Special Ops 3-N-1' ? (
                        <h2 className="specialOpsTitle">Special Ops <span>{props.productInfo.name.replace('Special Ops ', '')}</span></h2>
                    ) : (
                        <h2>{props.productInfo.name}</h2>
                    )}
    
                    <div className="price">${formatter.format(Number(props.productInfo.price.retail)).replace('$','')}</div>
            
                    <p>{props.productInfo.description}</p>

                    <ul>
                        {props.productInfo.specs.map((item: any, index: number) => {
                            return (
                            <li key={index}>{item}</li>
                            );
                        })}
                    </ul>

                    <button className="btn" onClick={handleBtnClick}>
                        Inquire For Purchase
                    </button>
                </div>
            </div>

        </div>
    )
}

export default ProductSpecs;
