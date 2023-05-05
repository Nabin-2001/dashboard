import React, { useState, useEffect } from "react";

import axios from "axios";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { url } from "./../Api/api";
import Swal from "sweetalert2";
import "../styles/category.css";

import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

import Modal from "react-bootstrap/Modal";

const token = localStorage.getItem("admin_token");

const Productlist = () => {
  const [product, setProduct] = useState();

  const navigate = useNavigate()
  const [show, setShow] = useState(false);

  const { id } = useParams();

  const [brand, setbrand] = useState([]);

  const [createProduct, setCreateProduct] = useState({
    product_title: "",

    sku_code: "",

    no_of_products: "",

    actual_price: "",

    selling_price: "",

    color: "",

    sub_category: id,

    description: "",

    brand: "",

    category: localStorage.getItem("Cateid"),

    images1: "",

    images2: "",

    thumbnail: "",
  });

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  //fetching product

  function fetchproduct() {
    axios

      .get(`http://13.50.248.3/super-admin/particular-sub-cat-products/${id}/`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })

      .then((res) => {
        setProduct(res.data.data);

        console.log(product);
      })

      .catch((err) => console.log(err));
  }

  //delete producting

  //  brand functionality

  useEffect(() => {
    axios
      .get("http://13.50.248.3/api/all-brands/")
      .then((res) => {
        console.log("brand data", res.data.data);
        setbrand(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteProduct = (item) => {
    axios

      .delete(`http://13.50.248.3/super-admin/delete-product/${item.id}`, {
        headers: {
          Authorization: `bearer ${token}`,
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
          fetchproduct();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setCreateProduct({ ...createProduct, [name]: value });
  };
  const handleFileChange = (event) => {
    setCreateProduct({
      ...createProduct,
      [event.target.name]: event.target.files[0],
    });
  };

  //creating product

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_title", createProduct.product_title);
    formData.append("sku_code", createProduct.sku_code);
    formData.append("no_of_products", createProduct.no_of_products);
    formData.append("actual_price", createProduct.actual_price);
    formData.append("selling_price", createProduct.selling_price);
    formData.append("color", createProduct.color);
    formData.append("sub_category", createProduct.sub_category);
    formData.append("description", createProduct.description);
    formData.append("brand", createProduct.brand);
    formData.append("category", createProduct.category);
    formData.append("images", createProduct.images);
    formData.append("images", createProduct.images);
    formData.append("thumbnail", createProduct.thumbnail);
  console.log(createProduct.brand)
    try {
      axios
        .post(`http://13.50.248.3/super-admin/add-product/`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
        console.log("brand data",  createProduct.brand)
          if (res.data.status == 200) {
            Swal.fire({
              position: "top-middle",
              icon: "success",
              title: "product added",
              showConfirmButton: false,
              timer: 1500,
            });
            fetchproduct();
          } else {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
    // console.log(createProduct.product_title);
    // console.log(createProduct.sku_code);
    // console.log(createProduct.no_of_products);
    // console.log(createProduct.actual_price);
    // console.log(createProduct.selling_price);
    // console.log(createProduct.color);
    // console.log(createProduct.sub_category);
    // console.log(createProduct.description);
    // console.log(createProduct.brand);
    // console.log(createProduct.category);
    // console.log(createProduct.images1);
    // console.log(createProduct.images2);
    // console.log(createProduct.thumbnail);
  };

  useEffect(() => {
    fetchproduct();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div>
          <button
            className="btn btn-primary"
            style={{ float: "right" }}
            onClick={handleShow}
          >
            Create Product{" "}
          </button>
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

              <th>Delete product</th>
              <th>edit Product</th>
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

                      <td>
                        <img
                          src={"http://13.50.248.3" + item.thumbnail}
                          alt=""
                          className="categry_img"
                        />
                      </td>

                      <td>{item.actual_price}</td>

                      <td>{item.selling_price}</td>

                      <td>
                        <span
                          style={{ color: "red" }}
                          onClick={() => deleteProduct(item)}
                        >
                          <FaTrash size={20} />
                        </span>
                      </td>
                      <td>
                        <Link to={`/ProductEditscreen/${item.id}`}>
                          <MdEdit style={{ color: "#30aed9" }} />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
      //code for modal
      <Modal show={show} size="lg" onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Product_Title"
                name="product_title"
                autoFocus
                onChange={handleInputChange}
              />

              <Form.Control
                type="number"
                placeholder="SKU CODE"
                name="sku_code"
                onChange={handleInputChange}
                autoFocus
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="No of product"
                name="no_of_products"
                autoFocus
                onChange={handleInputChange}
              />

              <Form.Control
                type="number"
                placeholder="Actual price"
                name="actual_price"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="Selling Price"
                name="selling_price"
                autoFocus
                onChange={handleInputChange}
              />

              <Form.Control
                type="text"
                placeholder="Colour"
                name="color"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                autoFocus
                onChange={handleInputChange}
              />

              <Form.Control
                type="file"
                placeholder="Image1"
                name="images"
                autoFocus
                onChange={handleFileChange}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="file"
                placeholder="Image2"
                name="images"
                autoFocus
                onChange={handleFileChange}
              />

              <Form.Control
                type="file"
                placeholder="Thumbnail"
                name="thumbnail"
                autoFocus
                onChange={handleFileChange}
              />
            </Form.Group>

            {/* <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="Sub Category"
                name="sub_category"
                autoFocus
                onChange={handleInputChange}
              />

              <Form.Control
                type="number"
                placeholder="category"
                name="category"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group> */}

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              {/* <Form.Control
                type="number"
                placeholder="brand"
                name="brand"
                autoFocus
                onChange={handleInputChange}
              /> */}
              <select
                type="number"
                placeholder="brand"
                name="brand"
                autoFocus
                onChange={handleInputChange}
                className="form-control"
              >
                {brand.map((item) => {
                  return (
                    <>
                      <option  value={item.id}>{item.brand_name}</option>
                      
                    </>
                    
                  );
                
                })}
                
              </select>
            </Form.Group>

            <button className="btn btn-primary" type="submit">
              Submit
            </button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Productlist;
