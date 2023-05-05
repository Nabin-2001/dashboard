import React ,{ useEffect, useState } from 'react'
import Swal from "sweetalert2";
import axios from 'axios';
import { FaTrash } from "react-icons/fa";
const token = localStorage.getItem("admin_token");
const url = "http://13.50.248.3";
const Brand = () => {
  const [brand ,setbrand]=useState([])
  function getstoredata() {
    axios
      .get("http://13.50.248.3/api/all-brands/")
      .then((res) => {
        setbrand(res.data.data);
      console.log(brand)
                                     
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // =================================================================================== add brand functionality start
    const [Data, setData] = useState({
      brand_name: "",
      brand_logo: "",
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
      const submitForm = (event) => {
        event.preventDefault();
        const formData = new FormData();
        if (Data.category_name === "") {
        }
        formData.append("brand_name", Data.brand_name);
        formData.append("brand_logo", Data.brand_logo);
        try {
          axios
            .post("http://13.50.248.3/super-admin/add-brand/", formData, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              console.log(res)
              if (res.data.status == 200) {
                Swal.fire({
                  position: "top-middle",
                  icon: "success",
                  title: "Brand  added",
                  showConfirmButton: false,
                  timer: 1500,
                });
              getstoredata()
                 
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
      // add brand functionality end =============================******************************************============================================
 
      // delete brand functionality  =====================================***********************************==============================
      const deleteitem = (id) => {
        axios
          .delete(`http://13.50.248.3/super-admin/delete-brand/${id}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
    
          .then((res) => {
            if (res.data.status == 200) {
              Swal.fire({
                position: "top-middle",
                icon: "success",
                title: "Brand  deleted successfully",
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
      
      // =============================================************ Delete brand functionality end ************====================================
      useEffect(() => {
        getstoredata();
      }, []);

  return (
    <div className='container py-3'>
     <button
          type="button"
          className="btn btn-primary float-end "
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add Brand
        </button>
        <table className="table">
          <thead>
            <tr className="text-center">
              <th scope="col">Num</th>
              <th scope="col">Img</th>
              <th scope="col">Brand Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brand.map((item, index) => {
              return (
                < >
                  <tr className="text-center" key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={url + item.brand_logo}
                        className="categry_img"
                        // onClick={() => subcategitem(item.id)}
                      />
                    </td>
                    <td>
                      <h5> {item.brand_name}</h5>
                    </td>
                    <td>
                      <span
                        className="btn btn-danger me-2"
                        onClick={() => deleteitem(item.id)}
                      >
                        <FaTrash size={20} />
                      </span>
                          
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>





{/* modal data */}
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
              <form >
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="brand_name"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Brand name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      name="brand_logo"
                      onChange={handleFileChange}
                      className="form-control"
                      type="file"
                      id="formFile"
                    />
                  </div>
                </div>
                <div className="row mb-3 text-center" >
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
      </div>
      
  )
}

export default Brand
