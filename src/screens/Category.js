import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/category.css";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
const url = "http://13.50.248.3";
const token = localStorage.getItem("admin_token");
const cateid = JSON.parse(localStorage.getItem("categry_id"));
const Category = () => {
  const navigate = useNavigate();
  const [categry, Setcategry] = useState([]);
  const [file, setfile] = useState([]);
  const [cname, setcname] = useState("");
  // ============================================================================================================Fetch categorydata
  console.log(cateid);
  function getstoredata() {
    // localStorage.setItem("CateId",id)
    axios
      .get("http://13.50.248.3/super-admin/all-category/")
      .then((res) => {
        Setcategry(res.data.data);
        console.log(categry); 
                                     
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // categry data end ================================================================================================================== Category end
  useEffect(() => {
    getstoredata();
  }, []);

  // delete categry ================================================================================================================delete category

  const deleteitem = (id) => {
    axios
      .delete(`http://13.50.248.3/super-admin/delete-category/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      .then((res) => {
        if (res.data.status == 200) {
          Swal.fire({
            position: "top-middle",
            icon: "success",
            title: "product deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          getstoredata();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // delete categry end ============================================================================================================================delete category

  //  Add category start================================================================================================================================
  const [Data, setData] = useState({
    category_name: "",
    category_image: "",
  });

  const handleChange = (event) => {
    setData({
      ...Data,
      [event.target.name]: event.target.value,
    });
  };

  const handleFileChange = (event) => {
    setData({
      ...Data,
      [event.target.name]: event.target.files[0],
    });
  };

  const subcategitem = (id) =>{
navigate(`/subcategory/${id}`)
localStorage.setItem("Cateid",id)
  }
  const submitForm = (event) => {
    event.preventDefault();
    console.log(Data.category_image)
    const formData = new FormData();
    if (Data.category_name === "") {
    }
    formData.append("category", Data.category_name);
    formData.append("category_image", Data.category_image);
    try {
      axios
        .post("http://13.50.248.3/super-admin/add-category/", formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(formData)
          if (res.data.status == 200) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "product added",
              showConfirmButton: false,
              timer: 1500,
            });
            getstoredata();
          
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              
            });
          }
        });
    } catch (error) {
      alert("somthing");
    }
  };

  // add category end ===========================================================================================================

  // edit category start =====================================================================================================
  
  //  edit category end =======================================================================================================
  

  return (
    <div>
      <h1 className="text-center">Category</h1>

      <div className="container">
        <button
          type="button"
          className="btn btn-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add category
        </button>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">Num</th>
              <th scope="col">Img</th>
              <th scope="col">categry</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categry.map((item, index) => {
              return (
                <>
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={url + item.category_image}
                        className="categry_img"
                        onClick={() => subcategitem(item.id)}
                      />
                    </td>
                    <td>
                      <h5> {item.category}</h5>
                    </td>
                    <td>
                      <span
                        className="btn btn-danger me-2"
                        onClick={() => deleteitem(item.id)}
                      >
                        <FaTrash size={20} />
                      </span>
                          <Link to={`/editcategory/${item.id}`} target="_blank">
                      <button
                        type="button"
                        className="btn btn-primary float-end"
                        
                      >
                        <span>
                          <MdEdit style={{color:"red"}} />
                        </span>
                        
                      </button>
                      </Link>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/*  add category */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-center" id="exampleModalLabel">
                Add product category
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="category_name"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Category name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      name="category_image"
                      onChange={handleFileChange}
                      className="form-control"
                      type="file"
                      id="formFile"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <button
                      type="submit"
                      onClick={submitForm}
                      className="btn btn-primary "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    >
                      Submit Form
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* category end */}

      {/*  edit category category */}
     
      {/* category end */}
    </div>
  );
};

export default Category;
