import { useContext } from "react";
import "./Item.css"
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";

const Item = (props) => {

  const {url} = useContext(ShopContext);
  
  return (
    <div>
      <div className="item">
        <Link to={`/product/${props.id}`}><img src={props.image} alt="" onClick={window.scrollTo(0, 0)} /></Link>
        <p>{props.name}</p>
        <div className="item-prices">
            <div className="item-price-new">
                ${props.new_price}
            </div>
            <div className="item-price-old">
                ${props.old_price}
            </div>
        </div>
      </div>
    </div>
  )
};

export default Item;
