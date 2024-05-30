import { useContext, useRef } from "react";
import "./Newsletter.css";
import { ShopContext } from "../../context/ShopContext";


const Newsletter = () => {
 
  const {handleSubscribeBtn} = useContext(ShopContext);

  const emailElement = useRef("");

  return (
    <div className="newsletter">
      <h1>Get Exclusive Offers On Your Email</h1>
      <p>Subscribe to our newsletter and stay updated</p>
        <div>
          <input type="email" placeholder="Your Email Id" ref={emailElement} required/>
          <button onClick={()=> {emailElement.current.value ? handleSubscribeBtn(emailElement.current.value) : alert("Please enter a emaild id to subscribe newletter!!!")}}>Subscribe</button>
        </div>
    </div>
  )
};

export default Newsletter;
