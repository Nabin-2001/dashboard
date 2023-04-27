import axios from "axios";
import React, { useEffect, useState } from "react";

export const User = () => {
  const [user,setuser]=useState([])
  useEffect(()=>{
    axios.get("http://13.50.236.236/super-admin/all-customers/")
    .then((res)=>{
       setuser(res.data.data)
     
    })
    .catch((err)=>{
      console.log(err)
    })
  },[])
  console.log(user)
  return (
    <div className="container">
      <h1 className="text-center">User List</h1>
      <table className="table border my-5">
          <thead>
            <tr className="text-center">
              <th scope="col">Num</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th>Dob</th>
              <th>Gender</th>
              <th>E-mail</th>
            </tr>
          </thead>
          <tbody>
            {user.map((item, index) => {
              return (
                <>
                  <tr className="text-center p-5" key={item.id}>
                    <td>{index + 1}</td>
                     <td>{item.name.toUpperCase()}</td>
                     <td>{item.phone}</td>
                     <td>{item.dob}</td>
                     <td>{item.gender}</td>
                     <td>{item.email}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      
    </div>
  );
};
