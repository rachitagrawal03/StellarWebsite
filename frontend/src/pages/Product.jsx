import { useContext, useEffect, useState } from "react";
import {ShopContext} from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";

const Product = () => {  
  
  const { all_product } = useContext(ShopContext);
  // const [product, setProduct] = useState([]);

  const {productId} = useParams();

  const proId = Number(productId);

  // const fetchInfo = async () => {
  //   await fetch(`http://localhost:4000/product/${proId}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setProduct(data);
  //     });
  // };

  // useEffect(() => {
  //   fetchInfo();
  // }, []);

  // useEffect( async ()=>{
    // if(all_product)
    //   {
    //      const nproduct = all_product.find((e)=> e.id === proId);
    //      setProduct(nproduct);
    //   } else {
      // const response = await fetch(`http://localhost:4000/product/${proId}`)
      // console.log("fetching data");
        // console.log(response);
        // console.log(response.json());
        // setProduct(response.data);
        // , {
        //     method: "POST",
        //     headers: {
        //       Accept: "application/form-data",
        //       "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ proId: proId }),
        //   })
      // }
  // })

  // console.log(all_product);
  // console.log(productId);
  // console.log(product);
  // console.log(product);
         const product = all_product.find((e)=> e.id === proId);
  return <div>
    <Breadcrumbs product={product} />
    <ProductDisplay product={product}/>
    <DescriptionBox/>
    <RelatedProducts/>
  </div>;
};

export default Product;
