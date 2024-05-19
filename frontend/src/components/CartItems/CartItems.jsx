import { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../context/ShopContext";
import remove_icon from "../../assets/cart_cross_icon.png"

const CartItems = () => {

    const {all_product, cartItems, removeFromCart} = useContext(ShopContext)
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
      {all_product.map((e)=> {
        if(cartItems[e.id]>0){
            return <div>
            <div className="cartItems-format cartItems-formatMain">
                <img src={e.image} alt="" className="cartItems-productImg"/>
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="cartItems-quantity">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img src={remove_icon} onClick={()=>removeFromCart(e.id)} alt="" className="cartItems-removeImg" />
            </div>
            <hr />
          </div>
        }
        return null;
      })}
    </div>
  )
};

export default CartItems;
