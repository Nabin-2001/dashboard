import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import "./App.css";
import Productlist from "./screens/Productlist";
import ProductEditScreen from "./screens/ProductEditScreen";
import Navbar from "./components/Navbar";
import { DashboardScreen } from "./screens/DashboardScreen";
import Category from './screens/Category'
import { User } from "./screens/User";
import { Orders } from "./screens/Orders";

import Login from "./screens/Login";
import Editcategory from "./screens/Editcategory";
import Subcategory from "./screens/SubCategory";
import Editsubcategry from "./screens/Editsubcategry";
import Subcategrysub from "./screens/Subcategrysub";
import { useEffect } from "react";

function App() {
  const token = JSON.parse(localStorage.getItem("adminLoginStatus"))
  useEffect(()=>{
<>
<Login />

</>
  },[])
  
  return (
    <BrowserRouter>
    <section>
      <div className="container-fluid">
        <div className="row col-12">
          <div className="col-2">
          <Navbar />
          </div>
          <div className="col-10">
          <Routes>
        <Route path="/" element={<Login />} />
         { token ? (
          <>
 <Route path="/dashboard" element={<DashboardScreen />} />
 <Route path="/productlist/:id" element={<Productlist />} />
 <Route path="/product/:id" element={<ProductEditScreen />} />
 <Route path="/category" element={<Category/>} />
<Route exact path="/subcategory/:id" element={<Subcategory/>} />
 <Route path="/orders" element={<Orders />} />
 <Route path="/productEditscreen/:id" element={<ProductEditScreen />} />
 <Route path="/user" element={<User />} />
 <Route path="/editcategory/:id" element={<Editcategory/>}/>
 <Route path="/subcategrysub/:id" element={<Subcategrysub/>}/>
 <Route path="/editsubcategry/:id" element={<Editsubcategry />} />
 </>
         ):<>
         data contained
         </>}
       
      </Routes>
          </div>

        </div>
      </div>
    </section>
  
    
    
    
    
      

     
    </BrowserRouter>
  );
}

export default App;
