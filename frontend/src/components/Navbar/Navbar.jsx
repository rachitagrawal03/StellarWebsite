import "./Navbar.css";
import logo from "../../assets/logo.png"
import cart_icon from "../../assets/cart_icon.png"
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from "../../assets/nav_dropdown.png"
import { FaOutdent } from "react-icons/fa";

const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef()

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  return <div className="navbar">
    <Link style={{textDecoration: "none"}} to='/'>
    <div className="nav-logo">
      <img src={logo} alt="" />
      <p>SHOPPER</p>
    </div>
    </Link>
    <FaOutdent className="nav-dropdown" onClick={dropdown_toggle}/>
    {/* <img className="nav-dropdown" src={nav_dropdown} alt="" onClick={dropdown_toggle}/> */}
    <ul ref={menuRef} className="nav-menu">
      <li onClick={() =>setMenu("shop")}> <Link style={{textDecoration: "none"}} to='/'>Shop</Link> {menu === "shop" && <hr/>}</li>
      <li onClick={() =>setMenu("men")}> <Link style={{textDecoration: "none"}} to='/men'>Men</Link> {menu === "men" && <hr/>}</li>
      <li onClick={() =>setMenu("women")}> <Link style={{textDecoration: "none"}} to='/women'>Women</Link> {menu === "women" && <hr/>}</li>
      <li onClick={() =>setMenu("kids")}> <Link style={{textDecoration: "none"}} to='/kids'>Kids</Link> {menu === "kids" && <hr/>}</li>
    </ul>
    <div className="nav-login-cart">  
      {localStorage.getItem('auth-token') ? <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace("/")}}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
      <Link to='/cart'><img src={cart_icon} alt=""/></Link>
      <div className="nav-cart-count">{getTotalCartItems()}</div>
    </div>
  </div>;
};

export default Navbar;
