import "./ProductDisplay.css";
import star_icon from "../../assets/star_icon.png";
import star_dull_icon from "../../assets/star_dull_icon.png";
import { useContext } from "react";
import { ShopContext } from "../../context/ShopContext";

const ProductDisplay = ({ product }) => {

    const {addToCart, url} = useContext(ShopContext);

  return (
    <div className="productDisplay">
      <div className="productDisplay-left">
        <div className="productDisplay-img-list">
          <img src={url + "/images/" + product.image} alt="" />
          <img src={url + "/images/" + product.image} alt="" />
          <img src={url + "/images/" + product.image} alt="" />
          <img src={url + "/images/" + product.image} alt="" />
        </div>
        <div className="productDisplay-img">
          <img src={url + "/images/" + product.image} className="productDisplay-mainImg" alt="" />
        </div>
      </div>

      <div className="productDisplay-right">
        <h1>{product.name}</h1>
        <div className="productDisplay-rightStars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productDisplay-rightPrices">
          <div className="productDisplay-rightPriceOld">
            ${product.old_price}
          </div>
          <div className="productDisplay-rightPriceNew">
            ${product.new_price}
          </div>
        </div>
        <div className="productDisplay-rightDescription">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        <div className="productDisplay-rightSize">
          <h1>Select Size</h1>
          <div className="productDisplay-rightSizes">
            <div>S</div>
            <div>M</div>
            <div>L</div>
            <div>XL</div>
            <div>XXL</div>
          </div>
        </div>
        <button onClick={()=> addToCart(product._id)}>ADD TO CART</button>
        <p className="productDisplay-rightCategory">
          {" "}
          <span>Category : </span> Women, T-Shirt, Crop Top
        </p>
        <p className="productDisplay-rightCategory">
          <span>Tags : </span> Modern, Latest
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
