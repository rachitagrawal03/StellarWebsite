import { useContext, useEffect, useState } from "react";
import {ShopContext} from "../context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs/Breadcrumbs";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../components/RelatedProducts/RelatedProducts";
import axios from "axios";

const Product = () => {  

  const { all_product, url } = useContext(ShopContext);
  const { productId } = useParams();
  const [product, setProduct] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const proId = Number(productId);
        const cachedProduct = localStorage.getItem(`product_${proId}`);
        
        if (cachedProduct) {
          setProduct(JSON.parse(cachedProduct));
          setLoading(false);
        } else {
          const foundProduct = all_product.find((e) => e.id === proId);
          // console.log(foundProduct);
          
          if (foundProduct) {
            setProduct(foundProduct);
            localStorage.setItem(`product_${proId}`, JSON.stringify(foundProduct));
            setLoading(false);
          } else {
            // Fetch product data from API if not found in context or cache
            const response = await axios.get(`${url}/api/product/${proId}`);
            console.log("api got fetched");
            setProduct(response.data);
            localStorage.setItem(`product_${proId}`, JSON.stringify(response.data));
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Error fetching product data.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, all_product]);

   // Log messages to the console based on state
   useEffect(() => {
    if (error) {
      console.log('Error fetching product data:', error);
    }
    if (product === null && !error) {
      console.log('Loading product data...');
    }
    if (product) {
      console.log('Product data loaded successfully.');
    }
  }, [error, product]);
  

  // if (loading) return <div>Loading...</div>; // Show loading state
  // if (error) return <div>{error}</div>; // Show error message
  // if (!product) return <div>Product not found.</div>; // Show product not found if no data


  return <div>
    <Breadcrumbs product={product} />
    <ProductDisplay product={product}/>
    <DescriptionBox/>
    <RelatedProducts/>
  </div>;
};

export default Product;
