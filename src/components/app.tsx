import React, {useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage';
import Inquiry from './inquiry';

import {productType} from '../assets/data/products';
import {testimonialType} from '../assets/data/testimonials';

type sampleData = {
  productData: productType[];
  testimonialData: testimonialType[];
}

const App = (props: sampleData) => {
  const [showInquiry, setShowInquiry] = useState(false);

  return (
    <>
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              <Homepage 
                openInquiry={() => setShowInquiry(true)}
                productData={props.productData}
                testimonialData={props.testimonialData}
              />
            } 
          />
        </Routes>
      </Router>
      <Inquiry
        closeInquiry={() => setShowInquiry(false)}
        showInquiry={showInquiry}
        productData={props.productData}
      />
    </>
  )
}

export default App;