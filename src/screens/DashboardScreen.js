import React, { useEffect, useState } from "react";
import "../styles/dashboard.css";
import {AiOutlineArrowUp,AiFillShopping,AiOutlineArrowDown} from 'react-icons/ai'
import {BsGraphUpArrow} from 'react-icons/bs'
import {BiUser} from 'react-icons/bi'
import {GiMoneyStack} from 'react-icons/gi'
import axios from "axios";

export const DashboardScreen = () => {
  const [user,setuser]=useState([])
  useEffect(()=>{
 axios.get("http://13.50.248.3/super-admin/all-customers/")
 .then((res)=>{
   setuser(res.data.data)
 })
 .catch((err)=>{
  console.log(err)
 })
  },[])
  return (
    
      <div className="home-section">
        <div className="home-inner">
          <div className="heading">
            <h3 className="home-heading">Hi, Welcome back</h3>
          </div>
          <div className="row " id="row">
            <div className="home-card col-md-6 col-sm-12 col-xl-3">
              <div className="home-body">
                <div className="left-col">
                  <p className="card-name">Total Sale</p>
                  <p className="card-value">₹ 283054.450</p>
                  <p className="growth"><span className="up-icons">< AiOutlineArrowUp/> +45% </span> <span className="value">This Week</span> </p>
                </div>
                <div className="right-col">
                  <div className="circle">
                    <BsGraphUpArrow className="graph"/>
                  </div>
                </div>
                
              </div>

            </div>
            <div className="home-card col-md-6 col-sm-12 col-xl-3">
              <div className="home-body">
                <div className="left-col">
                  <p className="card-name">Total User</p>
                  <p className="card-value">{user.length}</p>
                  <p className="growth"><span className="up-icons">< AiOutlineArrowUp/> +25% </span> <span className="value">This Week</span> </p>
                </div>
                <div className="right-col">
                  <div className="circle">
                    <BiUser className="graph"/>
                  </div>
                </div>
                
              </div>

            </div>
            <div className="home-card col-md-6 col-sm-12 col-xl-3">
              <div className="home-body">
                <div className="left-col">
                  <p className="card-name">Total Order</p>
                  <p className="card-value">415</p>
                  <p className="growth"><span className="down-icons">< AiOutlineArrowDown/> -25% </span> <span className="value">This Week</span> </p>
                </div>
                <div className="right-col">
                  <div className="circle">
                    <AiFillShopping className="graph"/>
                  </div>
                </div>
                
              </div>

            </div>
            <div className="home-card col-md-6 col-sm-12 col-xl-3">
              <div className="home-body">
                <div className="left-col">
                  <p className="card-name">Total Revenue</p>
                  <p className="card-value">₹ 538305.00</p>
                  <p className="growth"><span className="down-icons">< AiOutlineArrowDown/> -40% </span> <span className="value">From last Week</span> </p>
                </div>
                <div className="right-col">
                  <div className="circle">
                    <GiMoneyStack className="graph"/>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
        </div>
       
        
       
      </div>
    
  );
};
