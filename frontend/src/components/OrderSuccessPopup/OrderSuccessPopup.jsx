// import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderSuccessPopup.css";
import checkedImg from "../../assets/checked.png";
import cross_icon from "../../assets/cart_cross_icon.png";
import warning_icon from "../../assets/warning_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const OrderSuccessPopup = () => {

  const {orderFound, setOrderFound, setShowOrderPopup, } = useContext(ShopContext);
  
  return (
    <div className="popup">
      <div className="popupContainer">
          <img src={cross_icon} alt="" className="crossIcon" onClick={()=> {setShowOrderPopup(false); setOrderFound(false); window.location.href = '/';}}/>
        <div className="popupTitle">
          <img src={orderFound ? checkedImg : warning_icon} alt="" />
          {orderFound ? <h2>Congrats!!!</h2> : <h2>Error!!!</h2> } 
        </div>
        <div className="popupMessage">
          {orderFound ?<p>Your cash on delivery order has been successfully placed.</p> : <p>Your order couldn't place. Please check your internet connection.</p>}
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPopup;
