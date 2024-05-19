import "./RelatedProducts.css"
import data_product from "../../assets/data"
import Item from "../Item/Item";

const RelatedProducts = () => {
  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {data_product.map((item)=>{
            return (
                <Item
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              ); 
        })}
      </div>
    </div>
  )
};

export default RelatedProducts;
