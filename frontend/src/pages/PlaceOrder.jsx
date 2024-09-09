import { useContext, useState } from "react";
import "./css/PlaceOrder.css"
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const PlaceOrder = () => {
    
    const {getTotalCartAmount, placeOrder} = useContext(ShopContext);

    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      email: "",
      street: "",
      city: "",
      zipcode: "",
      country: "",
      phone: ""
    })

    const onChangeHandler = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setData(data =>({
        ...data, [name]:value
      }))
    }

    const resetForm = () => {
      setData({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        zipcode: "",
        country: "",
        phone: ""
      });
    };

    const handlePlaceOrder = async (event) => {
      event.preventDefault();
      await placeOrder(event, data); // Call the context API to place the order
      resetForm(); // Reset the form after placing the order
    };

  return (
    <form className="placeOrder" onSubmit={(event)=>handlePlaceOrder(event,data)}>
        <div className="placeOrderLeft">
            <h1 className="title">Delivery Information</h1>
            <div className="multiFields">
                <input type="text" placeholder="First Name" name="firstName" onChange={onChangeHandler} value={data.firstName} required/>
                <input type="text" placeholder="Last Name" name="lastName" onChange={onChangeHandler} value={data.lastName} required/>
            </div>
            <input type="email" placeholder="Email Addresss" name="email" onChange={onChangeHandler} value={data.email} required/>
            <input type="text" placeholder="Street" name="street" onChange={onChangeHandler} value={data.street} required/>
            <div className="multiFields">
                <input type="text" placeholder="City" name="city" onChange={onChangeHandler} value={data.city} required/>
                <input type="text" placeholder="State" name="state" onChange={onChangeHandler} value={data.state} required/>
            </div>
            <div className="multiFields">
                <input type="number" placeholder="Zip Code" name="zipcode" onChange={onChangeHandler} value={data.zipcode} required/>
                <input type="text" placeholder="Country" name="country" onChange={onChangeHandler} value={data.country} required/>
            </div>
            <input type="number" placeholder="Phone" name="phone" onChange={onChangeHandler} value={data.phone} required/>
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
          {/* <button type="submit">PROCEED TO PAYMENT</button> */}
          <button type="submit">PLACE ORDER</button>
        </div>
        </div>
    </form>
  )
};

export default PlaceOrder;
