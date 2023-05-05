import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import '../styles/editcategry.css'
import Swal from "sweetalert2";
const token = localStorage.getItem("admin_token");
const cateid = JSON.parse(localStorage.getItem("categry_id"));
const Editcategory = () => {
  
 
    const Navigate = useNavigate()
  const { id } = useParams();
  const [product, SetProduct] = useState({
    category_image: "",
    category: " ",
  });
 

  useEffect(()=>{
    axios.get(`http://13.50.248.3/super-admin/category-details/${id}/`)
    .then((res)=>{
    SetProduct(res.data)
    })
    .catch((err)=>{
      console.log(err)
    })
       },[])

  const editname = (event) => {
    const { name, value } = event.target;
    SetProduct({ ...product, [name]: value });
  };
  const editimage = (event) => {
    SetProduct({
      ...product,
      [event.target.name]: event.target.files[0],
    });
 
  };


  const handlesubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("category", product.category);
    formData.append("category_image", product.category_image);
    axios
      .put(
        `http://13.50.248.3/super-admin/edit-category/${id}/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
       
        if (res.data.status == 200) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "product update successfully",
              showConfirmButton: false,
              timer: 1500,
            });
            Navigate("/category")
            
          }
      })
      .catch((error) => {
        console.log(error);
        // handle error
      });
  };

  return (
    <div>
      <div className="container">
        <div className="row ">
        
            <div className="col-md-12" >
        <div>
          
        </div>
        <div className="col-md-12 col-md-offset-4">
        <div className="modal-body">
        
          <form onSubmit={handlesubmit} id="editform">
          <h2 className="modal-title text-center" id="exampleModalLabel">
            Edit  category
          </h2>
          <br></br>
            <div className="row mb-3">
              <div className="col-sm-10">
                <input
                  type="text"
                  name="category"
                  onChange={editname}
                  className="form-control"
                  placeholder="Category name"
                  value={product.category}
                  required
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-sm-10">
                <input
                  onChange={editimage}
                  className="form-control"
                  type="file"
                  id="formFile"
                  name="category_image"
                 required
                //  value={product.category_image}
                />
              </div>
            </div>
            <div>
                <button className="btn btn-danger">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
    </div>
  );
};

export default Editcategory;
