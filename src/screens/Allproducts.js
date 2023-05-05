import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
import { Link } from 'react-router-dom';
const token = localStorage.getItem("admin_token");
const Allproducts = () => {
    const [product,setProduct]=useState([])
    function fetchproduct() {
        axios
    
          .get(`http://13.50.248.3/super-admin/all-products/`, {
            headers: {
              Authorization: `bearer ${token}`,
            },
          })
    
          .then((res) => {
            setProduct(res.data.data);
           console.log(res.data.data)
            console.log(product);
          })
    
          .catch((err) => console.log(err));
      }
      useEffect(()=>{
fetchproduct()
      },[])
      
     
  return (
    <div className='py-5'>
      <div className="container-fluid">
        <div>
         
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>Sl NO</th>

              <th>Title</th>

              <th>Category</th>

              <th>image</th>

              <th> Actual Price</th>

              <th>Selling price</th>

          
            </tr>
          </thead>

          <tbody>
            {product &&
              product.map((item, index) => {
                return (
                  <>
                    <tr key={item.id}>
                      <td>{index + 1}</td>

                      <td>{item.product_title}</td>

                      <td>{item.category.category}</td>
                      <Link to={`/Review/${item.id}`} target="_blank" >
                        
                      <td className='p-1'>
                        <img
                          src={"http://13.50.248.3" + item.thumbnail}
                          alt=""
                          className="categry_img"
                          
                        />
                      </td>
                      </Link>
                      <td>{item.actual_price}</td>

                      <td>{item.selling_price}</td>

                      {/* <td>
                        <span
                          style={{ color: "red" }}
                          onClick={() => deleteProduct(item)}
                        >
                          <FaTrash size={20} />
                        </span>
                      </td> */}
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Allproducts
