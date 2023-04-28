import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
const token = localStorage.getItem("admin_token");
const url = "http://13.50.236.236";
const Subcategrysub = () => {
  const [subcatesub, setsubcatesub] = useState([]);
  const { id } = useParams();
  // useEffect(() => {
  //   axios
  //     .get(
  //       `http://13.50.236.236/super-admin/particular-sub-category-sub-category-list/${id}/`
  //     )
  //     .then((res) => {
  //       setsubcatesub(res.data.data);
  //       console.log(subcatesub);
  //       console.log(res.data.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  function getsubdata() {
    axios
        .get(
          `http://13.50.236.236/super-admin/particular-sub-category-sub-category-list/${id}/`
        )
        .then((res) => {
          setsubcatesub(res.data.data);
          console.log(subcatesub);
          console.log(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
  }
  useEffect(()=>{
      getsubdata()
  },[])

//   add subcatesub=============================================================
const [Data, setData] = useState({
    category:localStorage.getItem("Cateid"),
    sub_cat_id:id,
    sub_category:"",
    sub_category_img: "",
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
    console.log(Data.category)
    console.log(Data)
    const formData = new FormData();
    if (Data.category_name === "") {
    }
    formData.append("category",Data.category);
    formData.append("sub_cat_id",Data.sub_cat_id)
    formData.append("sub_category", Data.sub_category);
    formData.append("sub_category_img", Data.sub_category_img);
    try {
      axios
        .post(`http://13.50.236.236/super-admin/add-sub-category/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
         getsubdata()
        console.log(res)
          if (res.data.status == 200) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "product added",
              showConfirmButton: false,
              timer: 1500,
            });
           
          
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

  }
  const subcatedata = (id) =>{
     console.log(id)
  }
  return (
    <div>
      <div className="container-fluid">
        <h1 className="text-center">subcategrysub</h1>
        <button
          type="button"
          className="btn btn-primary float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModa3"
        >
          Add subcategory
        </button>
        <table class="table">
          <thead>
            <tr className="text-center">
              <th scope="col">Num</th>
              <th scope="col">img</th>
              <th scope="col">Sub_category</th>
            </tr>
          </thead>
          <tbody>
            {subcatesub.map((item, index) => {
              console.log(item.sub_cat_id);
              return (
                <>
                  <tr className="text-center">
                    <td>{index + 1}</td>
                    <td>
                      <Link to={`/productlist/${item.id}`} >
                      <img 
                        src={url + item.sub_category_img}
                        className="categry_img"
                      />
                        </Link>
                    </td>
                  
                    <td>{item.sub_category}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* modal of subcatesub */}
      <div
        className="modal fade"
        id="exampleModa3"
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
              {/* <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="category"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Category name"
                      
                    />
                  </div>
                </div> */}
                {/* <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="number"
                      name="sub_cat_id"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Category name"
                    />
                  </div>
                </div> */}
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      type="text"
                      name="sub_category"
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Category name"
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-sm-10">
                    <input
                      name="sub_category_img"
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
    </div>
  );
};

export default Subcategrysub;
