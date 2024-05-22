import AddProduct from "../../components/AddProduct/AddProduct";
import ListProduct from "../../components/ListProduct/ListProduct";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Admin.css"
import {Routes, Route} from "react-router-dom"

const Admin = () => {
  return (
    <div className="admin">
      <Sidebar/>
      <Routes>
        <Route path="/addproduct" element={<AddProduct/>} />
        <Route path="/listproduct" element={<ListProduct/>} />
      </Routes>
    </div>
  )
};

export default Admin;
