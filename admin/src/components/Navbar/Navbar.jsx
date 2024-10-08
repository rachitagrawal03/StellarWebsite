import "./Navbar.css"
import navLogo from "../../assets/nav-logo.svg"
import stellar_admin_logo from "../../assets/stellar_admin_logo.png"
import navProfile from "../../assets/nav-profile.svg"

const Navbar = () => {
  return (
    <div className="navbar">
      {/* <img src={navLogo} alt="" className="nav-logo" /> */}
      <img src={stellar_admin_logo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
};

export default Navbar;
