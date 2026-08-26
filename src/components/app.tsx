import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import Inquiry from './inquiry';
import Footer from './footer';
import Product from './product';
import LegacyProductRedirect from './legacyProductRedirect';
import Cart from './cart';
import CartSuccess from './cartSuccess';
import CartLink, { CartLimitNotice } from './cartLink';
import DealerPage from './dealerPage';
import { CartProvider } from '../context/cartContext';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';

type sampleData = {
  productData: productType[];
  testimonialData: testimonialType[];
}

const DismissLoader = (props: { setIsLoading: (value: boolean) => void; children: React.ReactNode }) => {
  useEffect(() => {
    props.setIsLoading(false);
  }, [props]);
  return <>{props.children}</>;
};

const App = (props: sampleData) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <CartProvider>
    {
      isLoading && (
        <div className="loader">
          <div className="scope">
            <div className="sights">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <div className="dot"></div>
          </div>
        </div>
      )
    }
      <Router>
        <CartLink />
        <CartLimitNotice />
        <Routes>
          <Route 
            path="/" 
            element={
              <Homepage 
                openInquiry={() => setShowInquiry(true)}
                productData={props.productData}
                testimonialData={props.testimonialData}
                isLoading={isLoading}
                setIsLoading={(value: boolean) => setIsLoading(value)}
              />
            } 
          />
          <Route 
            path="/deer-feeders/:slug"
            element={
              <Product 
                openInquiry={() => setShowInquiry(true)}
                testimonialData={props.testimonialData}
                isLoading={isLoading}
                setIsLoading={(value: boolean) => setIsLoading(value)}
              />
            } 
          />
          <Route
            path="/products/deer-feeders/:slug"
            element={<LegacyProductRedirect />}
          />
          <Route
            path="/cart"
            element={
              <DismissLoader setIsLoading={setIsLoading}>
                <Cart />
              </DismissLoader>
            }
          />
          <Route
            path="/checkout/success"
            element={
              <DismissLoader setIsLoading={setIsLoading}>
                <CartSuccess />
              </DismissLoader>
            }
          />
          <Route
            path="/dealers/:slug"
            element={
              <DismissLoader setIsLoading={setIsLoading}>
                <DealerPage
                  productData={props.productData}
                />
              </DismissLoader>
            }
          />
        </Routes>
        <Footer />
      </Router>
      <Inquiry
        closeInquiry={() => setShowInquiry(false)}
        showInquiry={showInquiry}
        productData={props.productData}
      />
    </CartProvider>
  )
}

export default App;