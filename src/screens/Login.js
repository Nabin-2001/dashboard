import React from 'react'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Navigate } from "react-router-dom";
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
            axios.post("http://16.170.252.94:8000/super-admin/login/", userFormData).then((res) => {
                if (res.data.bool === true) {
                    localStorage.setItem('adminLoginStatus', true);
                    localStorage.setItem('admin_token', res.data.token);
                    navigate('/dashboard');
                    console.log(res)
                } else {
                   alert("wrong input")
                }
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <section className="vh-100 gradient-custom">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-transparent border-0 text-white" >
                                <div className="card-body p-5 text-center">
                                    <div className="mb-md-3 mt-md-2 ">
                                        <h2 className="fw-bold mb-3 text-uppercase te">Login</h2>
                                        <p className="text-white-50 mb-4">Please enter your email and password!</p>
                                        <div className="form-outline form-white mb-5">
                                            <input name='username' onChange={handleChange} type="email" id="typeEmailX" placeholder='Email' className="form-control form-control-lg" />
                                        </div>
                                        <div className="form-outline form-white mb-5">
                                            <input name='password' onChange={handleChange} type="password" placeholder='Password' id="typePasswordX" className="form-control form-control-lg" />
                                        </div>
                                        {/* <Link to={"/dashboard"}><button className="btn btn-outline-light btn-lg px-5 btn-primary" type="submit">Login</button></Link> */}
                                        <button className="btn btn-outline-light btn-lg px-5 btn-primary" onClick={submitForm} type="submit">Login</button>
                                    </div>
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
        </div>
    )
}

export default Login

