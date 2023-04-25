import axios from 'axios'
import React, { useEffect, useState } from 'react'
import '../styles/category.css'
import { FaTrash } from 'react-icons/fa';
const url = "http://13.50.236.236"
const Category = () => {
  const [categry, Setcategry] = useState([])
  const[file,setfile]=useState([])
  const[cname,setcname]=useState("")
  // categry data
  function getstoredata() {
    axios.get('http://13.50.236.236/super-admin/all-category/')
      .then((res) => {
        Setcategry(res.data.data)
        console.log(categry)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  // categry data end
  useEffect(() => {
    getstoredata()
  }, [])
  // delete categry
  const deleteitem = (item) => {
    axios.delete(`http://13.50.236.236/super-admin/delete-category/${item.id}/`)
      .then((res) => {
        getstoredata()

      })
      .catch((err) => {
        console.log(err)
      })
  }
  // delete categry end
  const filechange =(e) =>{
     file.push(e.target.value)
     console.log(file)
  }
  const namehandle = () =>{

  }
  return (
    <div>
      <h1 className='text-center'>Category</h1>

      <div className='container'>

        <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Add category
        </button>
        <table className="table">
          <thead>
            <tr className='text-center'>
              <th scope="col">Num</th>
              <th scope="col">Img</th>
              <th scope="col">categry</th>

            </tr>
          </thead>
          <tbody>
            {
              categry.map((item, index) => {
                return (
                  <>
                    <tr className='text-center' key={item.id}>
                      <td>
                        {index + 1}
                      </td>
                      <td>
                        <img src={url + item.category_image} className="categry_img" />
                      </td>
                      <td>
                        <h5>{item.category}</h5>
                      </td>
                      <td>
                        <span style={{ color: "red" }} onClick={() => deleteitem(item)}><FaTrash size={20} /></span>
                      </td>
                    </tr>
                  </>
                )
              })
            }


          </tbody>
        </table>
      </div>
      {/* modal start */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
  <div className="mb-3">
    <input type="file" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={filechange}/> 
  </div>
  <div className="mb-3">
    <input type="text" className="form-control" id="exampleInputPassword1" onChange={namehandle}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
            </div>
          </div>
        </div>
      </div>
      {/* modal end */}
    </div>

  )
}

export default Category
