// import "bootstrap/dist/css/bootstrap.min.css";
import "./SubscribePopup.css";
import checkedImg from "../../assets/checked.png";
import cross_icon from "../../assets/cart_cross_icon.png";
import email_error_icon from "../../assets/email_error_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const SubscribePopup = () => {

  const {emailFound, setShowPopup, setEmailFound} = useContext(ShopContext);
  console.log("sub popup getting called");

  return (
    <div className="popup">
      <div className="popupContainer">
          <img src={cross_icon} alt="" className="crossIcon" onClick={()=> {setShowPopup(false); setEmailFound(false);}}/>
        <div className="popupTitle">
          <img src={emailFound ? checkedImg : email_error_icon} alt="" />
          {emailFound ? <h2>Thank You !!!</h2> : <h2>Already Subscribed !!!</h2>} 
        </div>
        <div className="popupMessage">
          {emailFound ? <p>Your subscription has been confirmed. You've been added to our list and will hear from us soon.</p> : <p>You've already subscribed for newsletter with this email-id.</p>}
        </div>
      </div>
    </div>
  );
};

export default SubscribePopup;
