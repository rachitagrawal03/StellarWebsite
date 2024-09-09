import Navbar from "./components/Navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <Admin />
    </div>
  );
};

export default App;
