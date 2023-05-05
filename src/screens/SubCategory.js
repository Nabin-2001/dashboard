import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
const token = localStorage.getItem("admin_token");
const url = "http://13.50.248.3";

const SubCategory = () => {
  const Navigate = useNavigate()
  
const [subcategory,setsubcategory]=useState([])
    const {id}=useParams()
    function getstoredata() {
      axios
        .get(`${url}/super-admin/particular-category-sub-category-list/${id}/`)
        .then((res) => {
          setsubcategory(res.data.data);
          console.log(subcategory);  
          console.log(res.data.data)                                 
        })
        .catch((err) => {
          console.log(err);
        });
    }
    useEffect(()=>{
   getstoredata()
    },[])
    

    const deleteitem = (id) => {
      axios
        .delete(`${url}/super-admin/delete-sub-category/${id}/`, {
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
    


    // add =============================================================================================================================
    const [Data, setData] = useState({
      category:id,
      sub_cat_id:"",
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
          .post(`${url}/super-admin/add-sub-category/`, formData, {
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

    }
    // add subcategory end ==========================================================================================================================
    const sub1 =(id) =>{
  Navigate(`/subcategrysub/${id}`)
 

      
    }
    const filterdata = subcategory.filter(item=>!item.sub_cat_id)
    console.log("filterdata",filterdata)
  return (
    <div className='container'>
      <h1 className='text-center'>Sub-Category</h1>
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
      <th scope="col">Action</th>
      
    </tr>
  </thead>
  <tbody>
    {
      filterdata.map((item,index)=>{
        console.log(item.sub_cat_id)
        return(
          <>
            <tr className="text-center">
              <td>{index+1}</td>
              <td>
              <img  onClick={()=>sub1(item.id)}
                        src={ url + item.sub_category_img}
                        className="categry_img"
                       
                      />
              </td>
              <td>
                {item.sub_category}
              </td>
              <td>
              <span
                        className="btn btn-danger me-2"
                        onClick={() => deleteitem(item.id)}
                      >
                        <FaTrash size={20} />
                      </span>
                      <Link to={`/editsubcategry/${item.id}`} target="_blank" >
                      <span className=' btn btn-danger'  >
                      <MdEdit style={{color:"white"}} />
                      </span>
                      </Link>
              </td>
            </tr>
          </>
        )
      })
    }
   
  </tbody>
</table>
  <div>

  </div>
      {/* add subcategory  */}
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
      {/* end */}
    </div>
  )
}

export default SubCategory
