import React, { lazy, Suspense, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import Footer from './footer';
import CartLink, { CartLimitNotice } from './cartLink';
import ScrollToTop from './scrollToTop';
import { CartProvider } from '../context/cartContext';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';

const Product = lazy(() => import(/* webpackChunkName: "product" */ './product'));
const LegacyProductRedirect = lazy(() => import(/* webpackChunkName: "legacy-product" */ './legacyProductRedirect'));
const Cart = lazy(() => import(/* webpackChunkName: "cart" */ './cart'));
const CartSuccess = lazy(() => import(/* webpackChunkName: "cart-success" */ './cartSuccess'));
const DealerPage = lazy(() => import(/* webpackChunkName: "dealer" */ './dealerPage'));
const Terms = lazy(() => import(/* webpackChunkName: "legal" */ './terms'));
const Privacy = lazy(() => import(/* webpackChunkName: "legal" */ './privacy'));
const Inquiry = lazy(() => import(/* webpackChunkName: "inquiry" */ './inquiry'));

type sampleData = {
  productData: productType[];
  testimonialData: testimonialType[];
  initialLoading?: boolean;
}

const DismissLoader = (props: { setIsLoading: (value: boolean) => void; children: React.ReactNode }) => {
  useEffect(() => {
    props.setIsLoading(false);
  }, [props]);
  return <>{props.children}</>;
};

const RouteFallback = () => null;

const App = (props: sampleData) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [isLoading, setIsLoading] = useState(props.initialLoading ?? true);

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
        <ScrollToTop />
        <CartLink />
        <CartLimitNotice />
        <main>
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
                <Suspense fallback={<RouteFallback />}>
                <Product 
                  testimonialData={props.testimonialData}
                  isLoading={isLoading}
                  setIsLoading={(value: boolean) => setIsLoading(value)}
                />
                </Suspense>
              } 
            />
            <Route
              path="/products/deer-feeders/:slug"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <LegacyProductRedirect />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense fallback={<RouteFallback />}>
                <DismissLoader setIsLoading={setIsLoading}>
                  <Cart />
                </DismissLoader>
                </Suspense>
              }
            />
            <Route
              path="/checkout/success"
              element={
                <Suspense fallback={<RouteFallback />}>
                <DismissLoader setIsLoading={setIsLoading}>
                  <CartSuccess />
                </DismissLoader>
                </Suspense>
              }
            />
            <Route
              path="/dealers/:slug"
              element={
                <Suspense fallback={<RouteFallback />}>
                <DismissLoader setIsLoading={setIsLoading}>
                  <DealerPage
                    productData={props.productData}
                  />
                </DismissLoader>
                </Suspense>
              }
            />
            <Route
              path="/terms"
              element={
                <Suspense fallback={<RouteFallback />}>
                <DismissLoader setIsLoading={setIsLoading}>
                  <Terms />
                </DismissLoader>
                </Suspense>
              }
            />
            <Route
              path="/privacy"
              element={
                <Suspense fallback={<RouteFallback />}>
                <DismissLoader setIsLoading={setIsLoading}>
                  <Privacy />
                </DismissLoader>
                </Suspense>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
      {showInquiry && (
        <Suspense fallback={null}>
          <Inquiry
            closeInquiry={() => setShowInquiry(false)}
            showInquiry={showInquiry}
            productData={props.productData}
          />
        </Suspense>
      )}
    </CartProvider>
  )
}

export default App;
