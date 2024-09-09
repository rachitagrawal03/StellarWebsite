import { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";
import axios from "axios";
import { toast } from "react-toastify";

const ListProduct = ({url}) => {
  const [allProducts, setAllProducts] = useState([]);


  const fetchProducts = async () => {
    const response = await axios.get(`${url}/api/product/list`)
    if(response.data.success){
      console.log(response);
      console.log(response.data);
      console.log(response.data.data);
      setAllProducts(response.data.data);
    } 
    else{
      toast.error("Error")
    }
  }

  // const fetchInfo = async () => {
  //   await fetch("https://shopperwebsite-gn7e.onrender.com/allproducts")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setAllProducts(data);
  //     });
  // };
  // console.log(allProducts);

  useEffect(() => {
    fetchProducts();
  }, []);

  const removeProduct = async (id) => {
    // console.log(id);
    const response = await axios.post(`${url}/api/product/remove`, {id: id});
    // await fetch("https://shopperwebsite-gn7e.onrender.com/removeproduct", {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({id:id})
    // })
    await fetchProducts();
    if(response.data.success){
      toast.success(" Product Removed")
    }
    else{
      toast.error("Error")
    }
  }
  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-formatMain">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return (
            <>
              <div
                key={index}
                className="listproduct-formatMain listproduct-format"
              >
                <img
                  src={`${url}/images/` + product.image}
                  alt=""
                  className="listproduct-productIcon"
                />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img
                  src={cross_icon}
                  alt=""
                  className="listproduct-removeIcon"
                  onClick={()=> removeProduct(product.id)}
                />
              </div>
              <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
