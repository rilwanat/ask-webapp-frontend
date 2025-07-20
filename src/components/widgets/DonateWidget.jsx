import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import background from '../../assets/images/ask-logo.png';
import RecyclingIcon from '@mui/icons-material/Recycling';
import PublicIcon from '@mui/icons-material/Public';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share'; 

import DonateNotificationModal from '../modals/DonateNotificationModal';
import DonateOptionsModal from '../modals/DonateOptionsModal';



//
import axiosInstance from '../../auth/axiosConfig'; // Ensure the correct relative path
import { setCookie, getCookie, deleteCookie, isAuthenticated } from '../../auth/authUtils'; // Ensure the correct relative path
import { jwtDecode } from 'jwt-decode';
//

import Loading from './Loading';
import MiniLoading from './MiniLoading';


import { usePaystackPayment } from 'react-paystack';

import bitcoin from '../../assets/crypto/Bitcoin_bc1qkmp6z2vsx3uu8jhhf9kp8asr0wctakc3ktuwty.png';
import ethereum from '../../assets/crypto/Ethereum_0x5736412760a26665Bfeb0679015b7bbD316dA3be.png';
import bnb from '../../assets/crypto/BNB_0x5736412760a26665Bfeb0679015b7bbD316dA3be.png';
import polygon from '../../assets/crypto/Polygon_0x5736412760a26665Bfeb0679015b7bbD316dA3be.png';
import solana from '../../assets/crypto/Solana_FG8gcgGJr55vtkznDB6UWi1fMjEhhGMaZnrjDcU1ULPa.png';
import ton from '../../assets/crypto/TON_UQDmODmw1zap0Dp51Vm_57nc6h_RiTXUER6r84vL9LrJpc_v.png';
import trc20 from '../../assets/crypto/TRC20_TUJqGSxtNaHyv7V2uHRGiGGy7xaiS5pxmA.png';


const DonateWidget = ({ userDetails, refreshUserDetails, gotoPage }) => {
  const navigate = useNavigate();
  // const [currentRequestSlide, setCurrentRequestSlide] = useState(0);
  // const [zoomedItemId, setZoomedItemId] = useState(null);

  const [isDataloading, setIsDataLoading] = useState(true);
  const [donationsData, setDonationsData] = useState([]);
  const [donationsSubscriptionsData, setDonationsSubscriptionsData] = useState([]);
  const currentPageName = "Donations";

  const [donatePrice, setDonatePrice] = useState(0);
  const currentPriceRef = useRef(0);
  const [donateType, setDonateType] = useState("naira");
  const [donateRecurring, setDonateRecurring] = useState(true);

  const [dollarExchangeRate, setDollarExchangeRate] = useState(1);
  
  
  

  //notification modal
      const [notificationType, setNotificationType] = useState(false);
      const [notificationTitle, setNotificationTitle] = useState("");
      const [notificationMessage, setNotificationMessage] = useState("");
      const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);
      const openNotificationModal = (type, title, message) => {
        setNotificationType(type);
        setNotificationTitle(title);
        setNotificationMessage(message);
    
        setIsNotificationModalOpen(true);
      };
      const closeNotificationModal = () => {
        setIsNotificationModalOpen(false);
      };
      //notification modal



  const navigateTo = (route, data) => {
    navigate(route, { state: data });
  };



  
      useEffect(() => {
        if (!isAuthenticated()) {
          openNotificationModal(null, "A", "Log in to proceed or Proceed without logging in#Note: Anonymous donors may not receive receipts.");
        }
        
        handleDonationsData();

        handlePlansData();
        handleDollarRateData();
      }, []);
      const handleDonationsData = async () => {
    
        setIsDataLoading(true);
    
    
        try {
          const donationsRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_READ_DONATIONS;
          // alert(beneficiariesRequestsEndpoint);
          const donationsRequestsResponse = await axiosInstance.get(donationsRequestsEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setDonationsData(donationsRequestsResponse.data.data);  // Update state with  count
      
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(donationsRequestsResponse.data.data), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          // alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      };

      const handlePlansData = async () => {
        // VITE_PAYSTACK_SUBSCRIPTIONS
        setIsDataLoading(true);
    
    
        try {
          const donationsSubscriptionsRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_PAYSTACK_SUBSCRIPTIONS;
          // alert(beneficiariesRequestsEndpoint);
          const donationsSubscriptionsRequestsResponse = await axiosInstance.get(donationsSubscriptionsRequestsEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setDonationsSubscriptionsData(donationsSubscriptionsRequestsResponse.data.data.plans_data);  // Update state with  count
      
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(donationsSubscriptionsRequestsResponse.data.data.plans_data), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          // alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      }

      const handleDollarRateData = async () => {
        
        setIsDataLoading(true);
    
    
        try {
          const dollarRateRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_DOLLAR_RATE;
          // alert(beneficiariesRequestsEndpoint);
          const dollarRateRequestsResponse = await axiosInstance.get(dollarRateRequestsEndpoint, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          setDollarExchangeRate(dollarRateRequestsResponse.data.data[0].rate);  // Update state with  count
      
      
          // openNotificationModal(true, currentPageName, "");
          // alert(JSON.stringify(dollarRateRequestsResponse.data.data[0].rate), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          // alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      }
      
      const handleIncrementDNQ = async (reference) => {
    
        
        
    
        const requestData = {   
          email: userDetails?.email_address ?? "anonymousdonor@askfoundations.org",
          price: currentPriceRef.current,
          type: donateType,
          reference: reference,
        };
        // alert(JSON.stringify(requestData), null, 2);
        // return;

        setIsDataLoading(true);
    
        try {
          const incrememtDNQRequestsEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_INCREMENT_DNQ;
          // alert(beneficiariesRequestsEndpoint);
          const incrememtDNQRequestsResponse = await axiosInstance.post(incrememtDNQRequestsEndpoint, requestData, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          // setDonationsData(incrememtDNQRequestsResponse.data.data);  // Update state with  count
      


          // setCookie('ask-user-token', token, expirationDays);
                      setCookie('ask-user-details', JSON.stringify(incrememtDNQRequestsResponse.data.userData));
          refreshUserDetails();


          openNotificationModal(true, "", 
            "THANK YOU FOR YOUR DONATION !#" +
            incrememtDNQRequestsResponse.data.message + 
            ", DNQ: " + incrememtDNQRequestsResponse.data.dnq +
            ", NewDNQ: " + incrememtDNQRequestsResponse.data.new_vote_weight
          );
          // alert(JSON.stringify(incrememtDNQRequestsResponse.data), null, 2);  // Update state with appointments count
        //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}
    
    
    
    
    
          // Once all data is fetched, set loading to false
          setIsDataLoading(false);
      
        } catch (error) {
          setIsDataLoading(false);
          
          // alert(error);
          // Handle errors
          if (error.response && error.response.data) {
            const errorMessage = error.response.data.message;
            openNotificationModal(false, currentPageName + " Error", errorMessage);
          } else {
            openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
          }
        }
      };


// Initialize as empty array if data is not yet loaded
const filteredDonations = Array.isArray(donationsData) 
? donationsData.filter(item => item.type === donateType)
: [];


        // Get currency symbol based on type
  const getCurrencySymbol = (type) => {
    switch(type) {
      case 'naira': return '₦';
      case 'dollar': return '$';
      case 'crypto': return 'Ξ'; // Ethereum symbol, or use '#' if you prefer
      default: return '₦';
    }
  };

  const formatPrice = (price) => {
    const numericPrice = parseInt(price);
    
    if (numericPrice >= 1000000) {
      // Format as millions (e.g., 1m, 1.5m)
      const millions = numericPrice / 1000000;
      return millions % 1 === 0 ? `${millions}m` : `${millions.toFixed(1)}m`;
    } else {
      // Format with thousand separators (e.g., 100,000)
      return numericPrice.toLocaleString();
    }
  };


  

  // PAYSTACK
    const onSuccess = (reference) => {
      // Implementation for whatever you want to do with reference and after success call.
      // setInputValue('');
      // setDonatePrice(0);
      // alert(reference);
      // alert(JSON.stringify(reference), null, 2);
      handleIncrementDNQ(reference["reference"]);
      // alert(reference["reference"]);
      // userDetails?.email_address ?? "anonymousdonor@askfoundations.org"
    };
    const onClose = () => {
      // implementation for  whatever you want to do when the Paystack dialog closed.
      // alert('closed');
    }
    // PAYSTACK


    const showSelectedPriceToPay = (payDonateType, price, symbol) => {
      
      // alert(dollarExchangeRate);
      // return;

      setDonatePrice(price);
      currentPriceRef.current = price;

      if (payDonateType == "naira") {
        const config = {
          reference: (new Date()).getTime().toString(),
          email: userDetails?.email_address ?? "anonymousdonor@askfoundations.org",
          amount: price * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
          publicKey: import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY,
        };
        const initializePayment = usePaystackPayment(config);
        initializePayment({onSuccess: onSuccess, onClose: onClose});
      } else if (payDonateType == "dollar") {
        const config = {
          reference: (new Date()).getTime().toString(),
          email: userDetails?.email_address ?? "anonymousdonor@askfoundations.org",
          amount: dollarExchangeRate * (price * 100) , //Amount is cents
          publicKey: import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY,
          // currency: "USD"
          
        };
        const initializePayment = usePaystackPayment(config);
        initializePayment({onSuccess: onSuccess, onClose: onClose});

      } else if (payDonateType == "crypto") {

      }
    };

    const showSelectedSubscribePriceToPay = (payDonateType, price, symbol, isRecurring = false, planCode = null) => {
      setDonatePrice(price);
      currentPriceRef.current = price;

      // alert(planCode);
    
      if (payDonateType === "naira") {
        const config = {
          reference: (new Date()).getTime().toString(),
          email: userDetails?.email_address ?? "anonymousdonor@askfoundations.org",
          amount: price * 100, // Amount in Kobo
          publicKey: import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY,
          ...(isRecurring && planCode ? { plan: planCode } : {}),
        };
        const initializePayment = usePaystackPayment(config);
        initializePayment({onSuccess: onSuccess, onClose: onClose});
        
      } else if (payDonateType === "dollar") {
        const config = {
          reference: (new Date()).getTime().toString(),
          email: userDetails?.email_address ?? "anonymousdonor@askfoundations.org",
          amount: price * 100, // Amount in Cents
          publicKey: import.meta.env.VITE_PAYSTACK_LIVE_PUBLIC_KEY,
          ...(isRecurring && planCode ? { plan: planCode, currency: 'USD' } : { currency: 'USD' }),
        };
        const initializePayment = usePaystackPayment(config);
        initializePayment({onSuccess: onSuccess, onClose: onClose});
    
      } else if (payDonateType === "crypto") {
        // Handle crypto payment if needed
      }
    };
    
    
    // Helper function to track subscription in your backend
    const trackSubscription = async (subscriptionCode, planCode) => {
      try {
        await axiosInstance.post((
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + '/track-subscription', {
          user_id: userDetails?.id,
          subscription_code: subscriptionCode,
          plan_code: planCode,
          email: userDetails?.email_address
        });
      } catch (error) {
        console.error('Error tracking subscription:', error);
      }
    };


    
    const [selectedAsset, setSelectedAsset] = useState(null);
    const [cryptoAssets, setCryptoAssets] = useState([]);
const defaultCrypto = 
  { id: 0, network: "Select", address: "_", image: "../../../../images/ask-cryptos/ask-logox.png" }
;

  useEffect(() => {
    handleData();
  }, []);
  const handleData = async () => {

    setIsDataLoading(true);


    try {
      // API crypto to get  count
      const userCryptosEndpoint = (
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + import.meta.env.VITE_USER_CRYPTOS_LIST;
      // alert(userCryptosEndpoint);
      const userCryptosResponse = await axiosInstance.get(userCryptosEndpoint, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // alert(JSON.stringify(userCryptosResponse.data.data), null, 2);
      setCryptoAssets(userCryptosResponse.data.data);  // Update state with  count
      // setSelectedAsset(userCryptosResponse.data.data[0]);
      setSelectedAsset(defaultCrypto);
      // Select">Select Crypto Network
      
      // openNotificationModal(true, currentPageName, "");
      // alert(JSON.stringify(userCryptosResponse.data.data), null, 2);  // Update state with cryptos count
    //   // {"status":true,"message":"Total amount calculated successfully","total_amount":"2311.60"}





      // Once all data is fetched, set loading to false
      setIsDataLoading(false);
  
    } catch (error) {
      setIsDataLoading(false);
      
      // alert(error);
      // Handle errors
      if (error.response && error.response.data) {
        const errorMessage = error.response.data.message;
        openNotificationModal(false, currentPageName + " Error", errorMessage);
      } else {
        openNotificationModal(false, currentPageName + " Error", "An unexpected error occurred.");
      }
    }
  };


  const showShortOptionsDonationModal = (payDonateType, price, symbol) => {
    openNotificationModal(true, "a","b");
  }


  return (
    <div className="w-full mt-4">
      <div className="flex flex-col h-auto px-4 sm:px-16 md:px-24">
        <div className="w-full p-4">
          <div className="flex flex-col  items-center justify-between">


{
                    isDataloading ? <Loading />
                    : 
          <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className=" flex items-center justify-center w-full"
              >
              <div className="mx-auto  w-full">
              
              {/* <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-2xl font-bold text-gray-800 mb-2"
              >
              <div className='flex flex-col items-center justify-center mb-2'>
              <p className=' mb-2' style={{ color: '', fontWeight: '700', fontSize: '24px' }}>Donate Now</p>
              <div className='bg-theme mb-2' style={{ width: '80px', height: '4px' }}></div>
              </div>
              
              
              </motion.h1> */}



              {/* Responsive Divs */}
              <div className="flex flex-col md:flex-row items-center md:items-start justify-center gap-4 w-full">
                  {/* Left Div */}
                  <div className="w-full md:w-1/2 p-4  rounded-lg">
                    <h2 className="text-lg font-semibold mb-2">Donate Now</h2>
                    <p className=" text-gray-600" style={{ fontSize: '18px',  }}>Kindly support us with your kind donations to help us share the pie of kindness to the vulnerable in the society. Together, we can make the world a better place.</p>
                    {/*{
                    !isAuthenticated() ? 
                    <div className='my-1 text-red-500'>Note: Anonymous donors may not receive a receipt and may forfeit donation value for daily nomination quota (DNQ).</div> : <></>
                  }*/}
                  <div className='flex mt-4 justify-center'>
                    <div className={`mx-2 px-4 py-1 rounded-lg  cursor-pointer border-2 border-theme
                      ${donateType === 'naira' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}
                      `} onClick={() => {setDonateType('naira');}}>Naira</div>
                    <div className={`mx-2 px-4 py-1 rounded-lg cursor-pointer  border-2 border-theme
                      ${donateType === 'dollar' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}`} onClick={() => {setDonateType('dollar');}}>Dollar</div>
                    <div className={`mx-2 px-4 py-1 rounded-lg cursor-pointer  border-2 border-theme
                      ${donateType === 'crypto' ? 'bg-theme text-softTheme' : 'bg-white text-theme'}`} onClick={() => {setDonateType('crypto');}}>Crypto</div>
                  </div>

                  {
                    (donateType === "naira" || donateType === "dollar") ? 
                    
                    <>
                    <div className='flex justify-center items-center mt-2  p-4 rounded'>
  <label className='flex items-center space-x-2 cursor-pointer'>
    <input type='radio' name='paymentType' value='one-time' className='accent-red-600' checked={!donateRecurring ? true : false} 
    onClick={() => {
      setDonateRecurring(false);
      }} />
    <span>One-time</span>
  </label>
  <div className='mx-2'></div>
  { 
  // isAuthenticated() && 
  donateType === "naira" ?
  <label className='flex items-center space-x-2 cursor-pointer'>
    <input type='radio' name='paymentType' value='recurring' className='accent-red-600' checked={donateRecurring ? true : false} 
    onClick={() => {
      setDonateType('naira');
      setDonateRecurring(true);
      }} />
    <span>Recurring</span>
  </label> : <></>
                  }
</div>
                    </> : <></>
                  }

                  </div>

                  

                  {/* Right Div */}
                  {donateType === "naira" && !donateRecurring && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <h3 className="text-lg font-semibold mb-2 capitalize text-white">
                Naira Donation
              </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
        {filteredDonations.map((item) => (
          <div key={item.id} 
            onClick={() => 
            {
              // showShortOptionsDonationModal();
              showSelectedPriceToPay(donateType, item.price, getCurrencySymbol(item.type));
            }}
            className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
            {getCurrencySymbol(item.type)}{formatPrice(item.price)}
          </div>
        ))}
      </div>
    </div>
  )}
{donateType === "naira" && donateRecurring && (
  <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
    {donationsSubscriptionsData && donationsSubscriptionsData.length > 0 ? (
      <div>
        {/* First group and sort the plans */}
        {Object.entries(
          donationsSubscriptionsData.reduce((groups, plan) => {
            const interval = plan.interval.toLowerCase();
            if (!groups[interval]) {
              groups[interval] = [];
            }
            groups[interval].push(plan);
            return groups;
          }, {})
        )
        .map(([interval, plans]) => {
          // Sort plans by amount in descending order
          const sortedPlans = [...plans].sort((a, b) => b.amount - a.amount);
          
          return (
            <div key={interval} className="mb-6">
              <h3 className="text-lg font-semibold mb-2 capitalize text-white">
                {interval} Commitments
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
                {sortedPlans.map((plan) => (
                  <div 
                    key={plan.id}
                    onClick={() => {
                      showSelectedSubscribePriceToPay(
                        donateType, 
                        plan.amount, 
                        getCurrencySymbol('naira'),
                        true, // isRecurring
                        plan.plan_code
                      );
                    }}
                    className="cursor-pointer px-4 py-1 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange"
                  >
                    <div className="font-bold">
                      {getCurrencySymbol('naira')}{formatPrice(plan.amount)}
                    </div>
                    <div className="text-sm mt-0">{plan.name}</div>
                    <div className="text-xs text-gray-500">
                      {plan.interval}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="text-center py-4">
        <p>No subscription plans available</p>
      </div>
    )}
  </div>
)}

{donateType === "dollar" && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <h3 className="text-lg font-semibold mb-2 capitalize text-white">
                Dollar Donation
              </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 p-2">
        {filteredDonations.map((item) => (
          <div key={item.id} 
            onClick={() => {
              // showShortOptionsDonationModal();
              showSelectedPriceToPay(donateType, item.price, getCurrencySymbol(item.type));
            }}
            className="cursor-pointer px-4 py-2 bg-gray-100 text-center rounded-lg shadow-md font-semibold text-lg hover:bg-softTheme hover:text-orange">
            {getCurrencySymbol(item.type)}{formatPrice(item.price)}
          </div>
        ))}
      </div>
    </div>
  )}

{donateType === "crypto" && (
    <div className="w-full md:w-1/2 p-4 bg-theme rounded-lg">
      <div className="flex flex-col p-2">
        <div className=''>
      {/* <label className='text-xs mb-1 text-white mr-2'>Network:</label> */}
      {selectedAsset && <select
        value={selectedAsset.network}
        onChange={(e) => {
          const found = cryptoAssets.find(asset => asset.network === e.target.value);
          setSelectedAsset(
            found || defaultCrypto
          );
        }}
        
        className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-theme bg-white"
      >
        <option value="Select">Select Crypto Network</option>
        {cryptoAssets.map((asset) => (
          <option key={asset.id} value={asset.network}>
            {asset.network}
          </option>
        ))}
      </select>}
      </div>

      {/* Preview image */}
      {selectedAsset && (
        <div className='flex flex-col items-center justify-center'>
          <div className='flex justify-between items-center mt-1 w-full'> 
            <label className=' sm:text-lg text-xs my-2 text-white break-all whitespace-normal'>{selectedAsset.address}</label>
            <div className={`ml-2 px-4 py-1 rounded-lg  cursor-pointer border-2 border-theme bg-white text-theme text-sm
                     
                      `} onClick={() => {
                        navigator.clipboard.writeText(selectedAsset.address)
                        alert("Wallet address: \n\n'" + selectedAsset.address + "'\n\ncopied to clipboard");
                      }}>Copy</div>
          </div> 
        <img
          src={(
          import.meta.env.VITE_IS_LIVE === 'true' ?
          import.meta.env.VITE_API_SERVER_URL :
          import.meta.env.VITE_API_DEMO_SERVER_URL
        )
        + "../../../" + selectedAsset.image}
          alt={selectedAsset.name}
          className="my-2 p-2 w-full h-64 object-contain rounded-md shadow-lg bg-white"
        />
        </div>
      )}
      </div>
    </div>
  )}
                </div>



              
              </div>
              </motion.div>
}






          </div>
        </div>
      </div>

      <DonateNotificationModal
              isOpen={isNotificationModalOpen}
              onRequestClose={closeNotificationModal}
              notificationType={notificationType}
              notificationTitle={notificationTitle}
              notificationMessage={notificationMessage}
              gotoPage={gotoPage}
            />


    </div>
  );
};

export default DonateWidget;