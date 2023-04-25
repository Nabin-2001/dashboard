import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Productlist from "./screens/Productlist";
import ProductEditScreen from "./screens/ProductEditScreen";
import Navbar from "./components/Navbar";
import { DashboardScreen } from "./screens/DashboardScreen";
import Category from './screens/Category'
import { User } from "./screens/User";
import { Orders } from "./screens/Orders";
import { SubCategory } from "./screens/SubCategory";
import Login from "./screens/Login";

function App() {
  const token = JSON.parse(localStorage.getItem("adminLoginStatus"))
 
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
         { token ? (
          <>
 <Route path="/dashboard" element={<DashboardScreen />} />
 <Route path="/productlist" element={<Productlist />} />
 <Route path="/product/:id" element={<ProductEditScreen />} />
 <Route path="/category" element={<Category/>} />
 <Route path="/category/:id" element={<SubCategory />} />
 <Route path="/orders" element={<Orders />} />
 <Route path="/user" element={<User />} />
 </>
         ):<>
         data contained
         </>}
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
