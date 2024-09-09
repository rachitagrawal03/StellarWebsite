import "./RelatedProducts.css"
// import data_product from "../../assets/data"
import Item from "../Item/Item";
import { useEffect, useState } from "react";
import BASE_URL from "../../../config";

const RelatedProducts = () => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(()=>{
    fetch(`${BASE_URL}/api/product/relatedproducts`) 
    .then((res) => res.json())
    .then((resData) =>{ 
      const arrayData = Object.values(resData.data);
      setRelatedProducts(arrayData);
    })    
  }, [])

  return (
    <div className="relatedProducts">
      <h1>Related Products</h1>
      <hr />
      <div className="relatedProducts-item">
        {relatedProducts.map((item)=>{
            return (
                <Item
                  key={item._id}
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
