import React, {useState, useEffect, useCallback, useRef, createRef} from 'react';

import { ReactComponent as HunterIcon } from '../assets/img/hunter.svg';
import { ReactComponent as OutfitterIcon } from '../assets/img/outfitter.svg';
import { ReactComponent as DealerIcon } from '../assets/img/dealer.svg';

import {productType} from '../assets/data/products';

import APIUtils from '../utils/APIUtils';

interface inquiryType {
  closeInquiry: () => void;
  showInquiry: boolean;
  productData: productType[];
}

const defaultInputData = [
  {
    name: 'Special-Ops',
    qty: '0',
    price: {
      retail: 1875,
      dealer: 1500
    }
  },
  {
    name: 'TreeHugger',
    qty: '0',
    price: {
      retail: 795,
      dealer: 635
    }
  },
  {
    name: '5-N-1',
    qty: '0',
    price: {
      retail: 2250,
      dealer: 1800
    }
  }
];

const Inquiry = (props: inquiryType) => {
  const [cost, setCost] = useState('0');

  const inputRef = useRef<any>(defaultInputData.map(() => createRef()));
  const [productInputValues, setProductInputValues] = useState(defaultInputData);
  const [showDealerPrice, setShowDealerPrice] = useState(false);

  const [userType, setUserType] = useState('hunter');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [formLoading, setFormLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const calculateTotalCost = useCallback((costArray: number[]) => {
    
    const formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    });

    let totalCost = 0;
    costArray.map((numb: any) => {
      return totalCost = numb + totalCost;
    });
    
    setCost(formatter.format(Number(totalCost)).replace("$",""));
  }, []);

  const calculateTotals = useCallback(() => {
    let totalInputValue = 0;
    let retailCosts: number[] = [];
    let dealerCosts: number[] = [];
    
    productInputValues.map((item: any) => {
      retailCosts.push((Number(item.qty) * Number(item.price.retail)));
      dealerCosts.push((Number(item.qty) * Number(item.price.dealer)));
      return totalInputValue = Number(item.qty) + totalInputValue;
    });
    if(totalInputValue >= 10) {
      setShowDealerPrice(true);
      calculateTotalCost(dealerCosts);
    }
    if(totalInputValue < 10) {
      setShowDealerPrice(false);
      calculateTotalCost(retailCosts);
    }
  }, [productInputValues, userType, calculateTotalCost]);
  
  const handleProductInputChange = (key: number, event: any) => {
    let result = productInputValues.filter(obj => {
      return obj.name === event.currentTarget.name;
    })
    result[0].qty = event.currentTarget.value;
    productInputValues[key] = result[0];

    setProductInputValues(productInputValues);
    calculateTotals();
  }

  const handleInputArrowClick = (direction: string, name: string, key: number) => {
    let result = productInputValues.filter(obj => {
      return obj.name === name;
    })
    if(direction === 'up') {
      result[0].qty = (Number(result[0].qty) + 1).toString();
    }
    if(direction === 'down' && Number(result[0].qty) > 0) {
      result[0].qty = (Number(result[0].qty) - 1).toString();
    }
    inputRef.current[key].current.value = result[0].qty;
    productInputValues[key] = result[0];
    setProductInputValues(productInputValues);
    calculateTotals();
  }

  const clearFormValues = () => {
    inputRef.current.map((input: object, index: number) => {
      return inputRef.current[index].current.value = '0';
    });
    setUserType('hunter');
    setFirstName('');
    setLastName('');
    setCompanyName('');
    setEmail('');
    setPhone('');
    setCost('0');
  }

  const validateForm = (formData: any) => {
    let errorFields: string[] = [];
    Object.keys(formData).forEach((key: string) => {
      
      // let productCount = 0;
      // if(key === 'cart') {
      //   formData[key].filter( (item: any) => {
      //     productCount = productCount + Number(item.qty);
      //   });
      //   if(productCount === 0) {
      //     errorFields.push(key);
      //   }
      // }

      if(key !=='cart' && formData[key] === '') {
        errorFields.push(key);
      }

    });
    if(errorFields.length > 0) {
      return {errors: errorFields};
    }
    return {errors: false};
  }

  const submitInquiry = () => {
    setFormLoading(true);
    setErrorMessage('');
    const formData: {
      type: string,
      first: string,
      last: string,
      company?: string,
      email: string,
      phone: string,
      status: string,
      cart: object[],
      cost: string
    } = {
      type: userType,
      first: firstName,
      last: lastName,
      email: email,
      phone: phone,
      status: 'submitted',
      cart: productInputValues,
      cost: cost
    }

    if(userType !== 'hunter') {
      formData.company = companyName;
    }

    const validate = validateForm(formData);

    if(validate.errors) {
      setErrorMessage('Please fill out all form fields and at least 1 product.');
      setFormLoading(false);
    }

    if(!validate.errors) {
      APIUtils.callPost('api/inquiry/submit', formData)
      .then((res) => {
        if(res.status !== 200) {
          return setErrorMessage(res.message);
        }
        setSuccessMessage('Thank You for your interest in our next generation deer feeders! We have received your inquriy and look forward to fulfilling your request. A member of our team will be in contact with you shortly.');
        clearFormValues();
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setFormLoading(false);
      });
    }
  }

  const handleCloseModal = () => {
    props.closeInquiry();
    setTimeout(() => setSuccessMessage(''), 1000);
  }

  useEffect(() => {
    calculateTotals();
  },[userType, calculateTotals]);
  
  return (
    <div className={props.showInquiry ? "inquiryModal show" : "inquiryModal"}>

      <button className="closeModal" onClick={() => props.closeInquiry()}></button>

      <section className="inquiryCart">
        <div className="alert info">
          Purchase 10 or more to receive dealer pricing.
        </div>
        {props.productData.map((item: any, index: number) => {
          return (
            <div key={index} className="inquiryProduct">
              <div className="inquiryProductWrap">
                <img src={item.image} alt={item.name} />
                <div className="inquiryProductCopy">
                  <div className="formGroup">
                    <span className="arrow up" onClick={(e) => handleInputArrowClick('up', item.name, index)}></span>
                    <span className="arrow down" onClick={(e) => handleInputArrowClick('down', item.name, index)}></span>
                    <input ref={inputRef.current[index]} value={inputRef.current[index].value} type="number" name={item.name} min="0" step="1" onChange={(e) => handleProductInputChange(index, e)} placeholder="0" />
                  </div>
                  <div className="copyGroup">
                    <h4>{item.name}</h4>
                    <div className={showDealerPrice ? 'price dealer' : 'price'}>
                      <span className="retail">${item.price.retail}</span>
                      <span className="dealer">${item.price.dealer}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <section className="inquiryForm">

      {successMessage && (
        <div className="inquirySuccessMessage">
          <h1>Thank You!</h1>
          <p>{successMessage}</p>
          <button className="btn white" onClick={handleCloseModal}>
            Close
          </button>
        </div>
      )}

      {!successMessage && (
        <>
        <div className="formHeader">
          <h4 className="price">
            <span className="ticker">$</span>{cost}
          </h4>
          <h5>Purchase Inquiry</h5>
        </div>

        <div className="formWrap">

          {errorMessage && (
            <p className="alert error">
              {errorMessage}
            </p>
          )}

          <div className="formGroup formBtnGroup">
            <label>Pick the role that best suits you...</label>
            <div className="btnGroup">
              <button className={userType === 'hunter' ? "selected" : ""} onClick={() => setUserType('hunter')}>
                <HunterIcon />
                Hunter
              </button>
              <button className={userType === 'outfitter' ? "selected" : ""} onClick={() => setUserType('outfitter')}>
                <OutfitterIcon />
                Outfitter
              </button>
              <button className={userType === 'dealer' ? "selected" : ""} onClick={() => setUserType('dealer')}>
                <DealerIcon />
                Dealer
              </button>
            </div>
          </div>

          <div className="formGroup half">
            <input type="text" name="first" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
            <input type="text" name="last" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          </div>

          {
            userType !== 'hunter' && (
              <div className="formGroup">
                <input type="text" name="company" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Company Name" />
              </div>
            )
          }

          <div className="formGroup">
            <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" />
          </div>

          <div className="formGroup">
            <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" />
          </div>

        </div>

        <div className="formSubmit">
          <button className="btn white" onClick={submitInquiry} disabled={formLoading}>
            {formLoading && (
              <>Sending...</>
            )}
            {!formLoading && (
              <>Send Inquiry</>
            )}
          </button>
        </div>
        </>
      )}

      </section>
    </div>
  )
}

export default Inquiry;
