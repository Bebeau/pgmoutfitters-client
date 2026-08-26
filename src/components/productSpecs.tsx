import React from 'react';
import {productType} from '../assets/data/products';
import { formatRetailPrice } from '../utils/cartStorage';
import { useAddToCartNavigate } from '../hooks/useAddToCartNavigate';

type productSpecsType = {
    productInfo: productType,
    openInquiry: () => void
}
const ProductSpecs = (props: productSpecsType) => {
    const addToCartAndGo = useAddToCartNavigate();

    // const handleBtnClick = () => {
    //     window.gtag('event', 'productSpecsCTA');
    //     props.openInquiry();
    // }

    const handleAddToCart = () => {
        addToCartAndGo({
            slug: props.productInfo.slug,
            name: props.productInfo.name,
            unitPrice: props.productInfo.price.retail,
        });
    }

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
    
                    <div className="price">{formatRetailPrice(Number(props.productInfo.price.retail))}</div>
            
                    <p>{props.productInfo.description}</p>

                    <ul>
                        {props.productInfo.specs.map((item: any, index: number) => {
                            return (
                            <li key={index}>{item}</li>
                            );
                        })}
                    </ul>

                    <div className="ctaGroup">
                        <button type="button" className="btn" onClick={handleAddToCart}>
                            Add to Cart
                        </button>
                        {/* <button type="button" className="btn outline" onClick={handleBtnClick}>
                            Inquire For Purchase
                        </button> */}
                    </div>
                </div>
            </div>

        </div>
    )
}

export default ProductSpecs;
