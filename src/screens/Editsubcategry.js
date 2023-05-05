import React,{useState}from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import Swal from "sweetalert2";
import axios from "axios";
const token = localStorage.getItem("admin_token");
const Editsubcategry = () => {
    const Navigate =useNavigate()
    const {id}=useParams()
    const [product, SetProduct] = useState({
        category:localStorage.getItem("Cateid"),
        sub_category:" ",
      });
    const editname = (event) => {
        const { name, value } = event.target;
        SetProduct({ ...product, [name]: value });
      };
      
      const handlesubmit = (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("category",product.category)
        formData.append("sub_category", product.sub_category);
       
        axios
          .put(
            `http://13.50.248.3/super-admin/edit-sub-category/${id}/`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then((res) => {
           console.log(res)
            if (res.data.status == 200) {
                Swal.fire({
                  position: "top-middle",
                  icon: "success",
                  title: "product update successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
                Navigate(`/subcategory/${localStorage.getItem("Cateid")}`)
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
        
          <form  id="editform" onSubmit={handlesubmit}>
          <h2 className="modal-title text-center" id="exampleModalLabel">
            Edit  category
          </h2>
          <br></br>
            <div className="row mb-3">
              <div className="col-sm-10">
                <input
                  type="text"
                  name="sub_category"
                  onChange={editname}
                  className="form-control"
                  placeholder="Category name"
                  required
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
  )
}

export default Editsubcategry
