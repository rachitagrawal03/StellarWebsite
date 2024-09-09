import "./Navbar.css";
import logo from "../../assets/logo.png"
import cart_icon from "../../assets/cart_icon.png"
import { useContext, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../../context/ShopContext";
import nav_dropdown from "../../assets/nav_dropdown.png"
import profile_icon from "../../assets/profile_icon.png"
import bag_icon from "../../assets/bag_icon.png"
import logout_icon from "../../assets/logout_icon.png"
import { FaOutdent } from "react-icons/fa";

const Navbar = () => {

  const [menu, setMenu] = useState("shop");
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef()
  let token = localStorage.getItem('auth-token')

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const logout = () => {
    localStorage.removeItem('auth-token'); 
    window.location.replace("/");
  }

  return <div className="navbar">
    <Link style={{textDecoration: "none"}} to='/'>
    <div className="nav-logo">
      <img src={logo} alt="" />
      <p>STELLAR</p>
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
      <Link to='/cart'><img src={cart_icon} alt=""/></Link>
      <div className="nav-cart-count">{getTotalCartItems()}</div>
      {!token ? <Link to='/login'><button>Login</button></Link> : 
      <div className="nav-profile">
        <img src={profile_icon} alt="" />
        <ul className="nav-profile-dropdown">
          <li><img src={bag_icon} alt="" />Orders</li>
          <hr />
          <li onClick={logout}><img src={logout_icon} alt="" />Logout</li>
        </ul>
      </div> }
    </div>
  </div>;
};

{/* <button onClick={()=> {localStorage.removeItem('auth-token'); window.location.replace("/")}}>Logout</button> : */}

export default Navbar;
