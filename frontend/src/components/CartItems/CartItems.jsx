import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart, getTotalCartAmount, handlePromocodeBtn, url } = useContext(ShopContext);

  const navigate = useNavigate();
  // console.log(cartItems);

  const handleProceedToCheckout = () => {
    // Check if there are items in the cart
    const hasItems = Object.values(cartItems).some(quantity => quantity > 0); 

    if (hasItems) {
      // Navigate to the Place Order page if there are items
      navigate('/order');
    } else {
      // Show an alert if the cart is empty
      toast.error("Please add items to the cart before proceeding to checkout.");
    }
  };
 
  return (
    
    <div className="cartItems">
      <div className="cartItems-formatMain">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e._id] > 0) {
          return (
            <div key={e._id}>
              <div className="cartItems-format cartItems-formatMain">
                <img src={url + "/images/" + e.image} alt="" className="cartItems-productImg" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartItems-quantity">
                  {cartItems[e._id]}
                </button>
                <p>${e.new_price * cartItems[e._id]}</p>
                <img
                  src={remove_icon}
                  onClick={() => removeFromCart(e._id)}
                  alt=""
                  className="cartItems-removeImg"
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
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
          <button onClick={handleProceedToCheckout}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartItems-promoCode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartItems-promoBox">
            <input type="text" placeholder="promo code" />
            <button onClick={handlePromocodeBtn}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
