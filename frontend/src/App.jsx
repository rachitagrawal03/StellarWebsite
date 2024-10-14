import "./App.css"; 
import Navbar from "./components/Navbar/Navbar";
// import Popular from "./components/Popular/Popular";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Shop from "./pages/Shop";
import ShopCategory from "./pages/ShopCategory";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import LoginSignUp from "./pages/LoginSignUp";
import Footer from "./components/Footer/Footer";
// import men_banner from "./assets/banner_mens.png"
// import women_banner from "./assets/banner_women.png"
// import kid_banner from "./assets/banner_kids.png"
import { useContext } from "react";
import SubscribePopup from "./components/SubscribePopup/SubscribePopup";
import OrderSuccessPopup from "./components/OrderSuccessPopup/OrderSuccessPopup";
import { ShopContext } from "./context/ShopContext";
import PlaceOrder from "./pages/PlaceOrder";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const {showPopup, showOrderPopup} = useContext(ShopContext);
  const men_banner = "https://res.cloudinary.com/doaux8dg1/image/upload/v1728900969/banner_mens_euavwq.png";
  const women_banner = "https://res.cloudinary.com/doaux8dg1/image/upload/v1728900969/banner_women_ladthr.png";
  const kid_banner = "https://res.cloudinary.com/doaux8dg1/image/upload/v1728900966/banner_kids_a50bdf.png";

  return (
    <>
    
      <div>
        <BrowserRouter>
          {showPopup && <SubscribePopup/>}
          {showOrderPopup && <OrderSuccessPopup/>}
          <ToastContainer/>
          <Navbar />
          <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/men" element={<ShopCategory category="men" banner={men_banner}  />} />
            <Route path="/women" element={<ShopCategory category="women" banner={women_banner} />} />
            <Route path="/kids" element={<ShopCategory category="kid" banner={kid_banner}/>} />
            <Route path="/product" element={<Product />}>
              <Route path=":productId" element={<Product />} />
            </Route>
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/order" element={<PlaceOrder />} />
          </Routes>
          <Footer/>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
