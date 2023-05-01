import React, { useEffect, useState } from "react";
import {
  FaThLarge,
  FaBars,
  FaAddressBook,
  FaInfo,
  FaBook,
  FaHome,
  FaUsers,
  FaHandshake,
  FaTimes,
} from "react-icons/fa";
import { useNavigate} from "react-router";
import { Link } from "react-router-dom";
import Login from "../screens/Login";
import "../styles/navbar.css";
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
   
    <div>
       { token ? (
    
      <div className="header">
        <div className="header__search">
          <ul id="menu" className={click ? "nav-menu active" : "nav-menu"}>
            <li>
              <a href="/dashboard" className="nav-link">
                <FaHome size={ICON_SIZE} />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/productlist/:id" className="nav-link">
                <FaInfo size={ICON_SIZE} />
                <span>Products</span>
              </a>
            </li>
            <li>
              <Link to={"/category"} className="nav-link">
                <FaInfo size={ICON_SIZE} />
                <span style={{color:"black"}}>category</span>
              </Link>
            </li>
            <li>
              <a href="/orders" className="nav-link">
                <FaBook size={ICON_SIZE} />
                <span>Orders</span>
              </a>
            </li>
            <li>
              <a href="/user" className="nav-link">
                <FaHandshake size={ICON_SIZE} />
                <span>Users</span>
              </a>
            </li>
            {token ? <>
       <button className="btn btn-danger" onClick={logout}>logout</button>
       </> :<>      <button className="btn btn-danger" onClick={loginauth}>login</button></>
    }
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
