import "./AddProduct.css";
import upload_area from "../../assets/upload_area.svg";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddProduct = ({url}) => {

  const [image, setImage] = useState(false);
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "men",
    new_price: "",
    old_price: "",
  });
  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };
  const imageHandler = (e) => {
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", productDetails.name)
    formData.append("old_price", Number(productDetails.old_price))
    formData.append("new_price", Number(productDetails.new_price))
    formData.append("category", productDetails.category)
    formData.append("image", image)

    const response = await axios.post(`${url}/api/product/add`, formData);

    if(response.data.success){
      setProductDetails({
        name: "",
        image: "",
        category: "men",
        new_price: "",
        old_price: "",    
      })
      setImage(false)
      toast.success(response.data.message)
    } 
    else{
      toast.error(response.data.message)
    }



    // let responseData;
    // let product = productDetails;

    // formData.append("product", image);
    // await fetch("https://shopperwebsite-gn7e.onrender.com/upload", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //   },
    //   body: formData,
    // })
    //   .then((res) => res.json())
    //   .then((data) => {
    //     responseData = data;
    //   });

    // if (responseData.success) {
    //   product.image = responseData.image_url;
    //   // console.log(product);
    //   // console.log(JSON.stringify(product));

    //   await fetch('https://shopperwebsite-gn7e.onrender.com/addproduct', {
    //     method: 'POST',
    //     headers: {
    //       Accept: 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(product)
    //   }).then((res)=> res.json()).then((data)=> {data.success ? alert("Product Added") : alert("Failed to add product")})
    // }
  };
  return (
    <form className="add-product" onSubmit={handleFormSubmit}>
      <div className="addproduct-itemfield">
        <p>Product Title</p>
        <input
          type="text"
          name="name"
          placeholder="Type Here"
          value={productDetails.name}
          onChange={changeHandler}
          required
        />
      </div>

      <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            placeholder="Type here"
            value={productDetails.old_price}
            onChange={changeHandler}
            required
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            placeholder="Type here"
            value={productDetails.new_price}
            onChange={changeHandler}
            required
          />
        </div>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Category</p>
        <select
          name="category"
          className="addProduct-selector"
          value={productDetails.category}
          onChange={changeHandler}
          required
        >
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="kid">Kid</option>
        </select>
      </div>

      <div className="addproduct-itemfield">
        <p>Product Image</p>
        <label htmlFor="file-input">
          <img
            src={image ? URL.createObjectURL(image) : upload_area}
            alt=""
            className="addproduct-thumbnailImg"
            required
          />
        </label>
        <input
          onChange={imageHandler}
          type="file"
          name="image"
          id="file-input"
          hidden
        />
      </div>
      <button type="submit" className="addproduct-btn">
        ADD
      </button>
    </form>
  );
};

export default AddProduct;
