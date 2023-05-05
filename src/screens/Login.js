import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";
import './../styles/login.css'
const token = localStorage.getItem("admin_token");
const Login = () => {
    let navigate = useNavigate()
    const [userLoginData, setuserLoginData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (event) => {
        setuserLoginData({
            ...userLoginData,
            [event.target.name]: event.target.value
        })
    }

    const submitForm = event => {
        event.preventDefault();
        const userFormData = new FormData();
        userFormData.append('username', userLoginData.username)
        userFormData.append('password', userLoginData.password)
        try {
            axios.post("http://13.50.248.3/super-admin/login/", userFormData).then((res) => {
                if (res.data.bool === true) {
                    localStorage.setItem('adminLoginStatus', true);
                    localStorage.setItem('admin_token', res.data.token);
                    navigate('/dashboard');
                    console.log(res)
                    window.location.reload()
                } else {
                   alert("wrong input")
                   Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    
                  });
                }
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                
              });
        }
    }

    return (
        <>
             { token ? <>
             
             </>:
            <section className="vh-100 gradient-custom " >
                <div className="content  h-100 m-0">
                    <div className="row d-flex align-items-center h-100">
                        <div className='col-md-8 login-container  col-sm-12 '>
                            <div className='banner'>
                                

                            </div>

                        </div>
                        <div className="col-4 col-md-4 col-lg-4 card-top col-sm-12 ">
                            <div className="card  border-0 text-white" >
                                <div className="card-body  ">
                                    <form className="mb-md-3 mt-md-2 ">
                                        <div className='heading text-center'>
                                        <h2 className="fw-bold mb-3 text-uppercase te" style={{color:"black"}}>Login</h2>
                                        <p className=" mb-4" style={{color:"black"}}>Please enter your email and password!</p>

                                        </div>
                                       
                                        <div className="form-outline form-white mb-3">
                                            <label>Enter Your Email</label>
                                            <input name='username' onChange={handleChange} type="email" id="typeEmailX" placeholder='Email' className="form-control form-control-lg" />
                                        </div>
                                        <div className="form-outline form-white mb-3">
                                        <label>Enter Your Password</label>

                                            <input name='password' onChange={handleChange} type="password" placeholder='Password' id="typePasswordX" className="form-control form-control-lg" />
                                        </div>
                                        <div className='footer d-flex justify-content-center'>
                                        <button className="btn btn-outline-light btn-lg px-5 btn-primary m-3" onClick={submitForm} type="submit">Login</button>

                                        </div>
                                      
                                   
                                    </form>
                                    {/* <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a>
                                        </p>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
}
        </>
    )
}

export default Login

