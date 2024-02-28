import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import Inquiry from './inquiry';
import Footer from './footer';
import Product from './product';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';

type sampleData = {
  productData: productType[];
  testimonialData: testimonialType[];
}

const App = (props: sampleData) => {
  const [showInquiry, setShowInquiry] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
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
            path="/products/deer-feeders/:slug"
            element={
              <Product 
                openInquiry={() => setShowInquiry(true)}
                testimonialData={props.testimonialData}
                isLoading={isLoading}
                setIsLoading={(value: boolean) => setIsLoading(value)}
              />
            } 
          />
        </Routes>
      </Router>
      <Footer />
      <Inquiry
        closeInquiry={() => setShowInquiry(false)}
        showInquiry={showInquiry}
        productData={props.productData}
      />
    </>
  )
}

export default App;