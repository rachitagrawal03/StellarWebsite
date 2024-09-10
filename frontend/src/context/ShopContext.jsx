import { createContext, useCallback, useEffect, useState, useRef } from "react";
// import all_product from "../assets/all_product";
import axios from "axios";
// import BASE_URL from './../../config'; 


export const ShopContext = createContext(null);

const url = import.meta.env.VITE_BASE_URL;

const ShopContextProvider = (props) => {
  const [all_product, setAllProduct] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [emailFound, setEmailFound] = useState(false);
  const [showOrderPopup, setShowOrderPopup] = useState(false);
  const [orderFound, setOrderFound] = useState(false);

  const emailElement = useRef("");
  
  const fetchAllProduct = async () => {
    const response = await axios.get(url + "/api/product/list");
    setAllProduct(response.data.data);
  }

  const token = localStorage.getItem("auth-token");
  const loadCartData = async() =>{
    const response = await axios.post(url + "/api/cart/get", {}, {headers: {token}})
    setCartItems(response.data.cartData)
  }
  
  useEffect(()=> {
    async function loadProducts() {
      await fetchAllProduct();
      if(localStorage.getItem("auth-token")){
        await loadCartData(localStorage.getItem("auth-token"));
      }
    }
    loadProducts();
  }, [])  

  const handleSubscribeBtn = async (emailId) => {
    try {
      let response = await axios.post(`${url}/api/subscribe/newsletter`, { email: emailId });
      console.log(response);
      if (response.data.success) {
        setEmailFound(true);
        emailElement.current.value = "";
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setEmailFound(false);  // Handle the case where email is already subscribed
        // alert(error.response.data.message); // Show an alert with the error message
      } else {
        alert("An error occurred. Please try again later."); // Handle other possible errors
      }
    }
    setShowPopup(true);
  };

  const addToCart = async (itemId) => { 
    if(!cartItems[itemId]){
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } 
    else{
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }

    if(localStorage.getItem("auth-token")){
      await axios.post(url+ "/api/cart/add", {itemId}, {headers: {token}})
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1,
    }));
    if(token){
      await axios.post(url+ "/api/cart/remove", {itemId}, {headers: {token}})
      
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = all_product.find(
          (product) => product._id === (item)
        );
        totalAmount += itemInfo.new_price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const handlePromocodeBtn = () => {
    
  }

  const placeOrder = async (event, data) =>{
    event.preventDefault();
    let orderItems = [];
    all_product.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
    }
    console.log(orderData);
    
    let response = await axios.post(url + "/api/order/place", orderData, {headers: {token}})
    console.log(response); 
    if(response.data.success){
      setOrderFound(true);
    } 
    else {
      alert("front Error");
    }
    window.scrollTo(0, 0);
    setShowOrderPopup(true);
  };

  const getTotalCartItems = () => {
    let totalItem = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItem += cartItems[item];
      }
    }
    return totalItem;
  };

  const contextValue = {
    all_product,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    setShowPopup,
    showPopup,
    handleSubscribeBtn,
    emailFound,
    setEmailFound,
    handlePromocodeBtn,
    url,
    emailElement,
    token,
    placeOrder,
    showOrderPopup,
    setShowOrderPopup,
    orderFound,
    setOrderFound,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
