import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import Sidebar from "../../components/Sidebar/Sidebar";
import Orders from "../../components/Orders/Orders";
import "./Admin.css"
import {Routes, Route} from "react-router-dom"

const Admin = () => {
  const url = import.meta.env.VITE_BASE_URL;

  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route path="/addproduct" element={<AddProduct url={url} />} />
        <Route path="/listproduct" element={<ListProduct url={url} />} />
        <Route path="/orders" element={<Orders url={url} />} />
      </Routes>
    </div>
  )
};

export default Admin;
