import { useContext } from "react";
import "./css/PlaceOrder.css"
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {

    const {getTotalCartAmount} = useContext(ShopContext);

  return (
    <form className="placeOrder">
        <div className="placeOrderLeft">
            <h1 className="title">Delivery Information</h1>
            <div className="multiFields">
                <input type="text" placeholder="First Name"/>
                <input type="text" placeholder="Last Name"/>
            </div>
            <input type="email" placeholder="Email Addresss"/><input type="email" placeholder="Street"/>
            <div className="multiFields">
                <input type="text" placeholder="City"/>
                <input type="text" placeholder="State"/>
            </div>
            <div className="multiFields">
                <input type="text" placeholder="Zip Code"/>
                <input type="text" placeholder="Country"/>
            </div>
            <input type="text" placeholder="Phone" />
        </div>

        <div className="placeOrderRight">
        <div className="cartItems-total">
          <h1>Cart Total</h1>
          <div>
            <div className="cartItems-totalItem">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cartItems-totalItem">
              <p>Shipping Fee</p>
              <p>${getTotalCartAmount() ==0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cartItems-totalItem">
              <h3>Total</h3>
              <h3>${getTotalCartAmount() ==0 ? 0 : getTotalCartAmount()+5}</h3>
            </div>
          </div>
          <button>PROCEED TO PAYMENT</button>
        </div>
        </div>
    </form>
  )
};

export default PlaceOrder;
