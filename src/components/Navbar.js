import React, { useEffect, useState } from "react";
import {
  
  FaBars,
  FaInfo,
  FaBook,
  FaHome,
  FaUsers,
  FaTimes,
  FaShoppingBag,
} from "react-icons/fa";
import {BsFillCartPlusFill} from "react-icons/bs"

import {AiOutlineLogout} from 'react-icons/ai';
import {MdShoppingCart} from "react-icons/md"
import {BiCategory,BiShoppingBag} from "react-icons/bi";
import { useNavigate} from "react-router";
import { Link } from "react-router-dom";
import Login from "../screens/Login";
import "../styles/navbar.css";
import logo from "./../assets/logo.png";
const token = localStorage.getItem("admin_token");
const ICON_SIZE = 20;

function Navbar({ visible, show }) {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const navigate =useNavigate()
  const token = JSON.parse(localStorage.getItem("adminLoginStatus"))
  const logout = () =>{
    localStorage.clear()
    navigate("/")
    window.location.reload()
  }
  
  const loginauth =()=>{
    navigate("/category")
    window.location.reload()
  }
  return (
   
   <div className="col-md-2">
       { token ? (
    
      <div className="header">
        <div className="logo">
          <img src={logo} alt="logo" className="logoimg"/>
        </div>
        <div className="header_search">
          <ul id="menu" className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <Link to={"/dashboard"} className="nav-link">
                <FaHome size={ICON_SIZE} />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to={"/productlist/:id"} className="nav-link">
                <MdShoppingCart size={ICON_SIZE} />
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to={"/category"} className="nav-link">
                <BiCategory size={ICON_SIZE} />
                <span >category</span>
              </Link>
            </li>
            <li>
              <Link to={"/category"} className="nav-link">
                <BsFillCartPlusFill size={ICON_SIZE} />
                <span >Add brands</span>
              </Link>
            </li>
            <li>
              <Link to={"/orders"} className="nav-link">
                <FaShoppingBag/>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to={"/user"} className="nav-link">
                <FaUsers size={ICON_SIZE}/>
                <span>Users</span>
              </Link>
            </li>
            <div className="login-btn">
          {token ? <>
       <button className="btn-login" onClick={logout}> <AiOutlineLogout/>logout</button>
       </> :<>      <button className="btn-login" onClick={loginauth}>login</button></>
    }

          </div>
      
          </ul>
         
        </div>

        <div className="header__nav">
          <div style={{ padding: "20px", display: "flex" }}>
            <div className="hamburger" onClick={handleClick}>
              {click ? (
                <FaTimes size={20} style={{ color: "#f28610" }} />
              ) : (
                <FaBars size={20} style={{ color: "#f28610" }} />
              )}
            </div>
          </div>
        </div>
      </div>
      ):<>
         </>}
         </div>
  );
}

export default Navbar;
