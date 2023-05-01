import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";
import "./../styles/product.css";
import { url } from "./../Api/api";

const token = localStorage.getItem("admin_token");

const ProductEditScreen = () => {
  const Navigate = useNavigate();
  const { id } = useParams();

  const [product, setproduct] = useState({
    product_title: "",
    description: "",
    category:localStorage.getItem("Cateid"),
    sub_category:"",
    sku_code: "",
    no_of_products: "",
    actual_price: "",
    selling_price: "",
    brand: "",
    color: "",
    no_of_orders: "",
    no_of_wishlists: "",
    no_of_cart: "",
    img: " ",
    img: " ",
  });

  function Editingproduct() {
    axios.get(`${url}all-products/${id}`).then((res) => {
      setproduct(res.data);
      console.log(product);
    });
  };

  //--------------------------------------------code for update data------------------------------

  const editData = (event) => {
    setproduct({ ...product, [event.target.name]: event.target.value });
    
  };
  const editDataimage = (event) => {
    setproduct({
      ...product,
      [event.target.name]: event.target.files[0],
    });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
   console.log(product.product_title)
   console.log(product.description)
   console.log(product)
    formData.append("product_title", product.product_title);
    formData.append("sku_code", product.sku_code);
    formData.append("no_of_products", product.no_of_products);
    formData.append("actual_price", product.actual_price);
    formData.append("selling_price", product.selling_price);
    formData.append("color", product.color);
    formData.append("description", product.description);
    formData.append("category", product.category);
    formData.append("img", product.img);
    formData.append("sub_category", product.sub_category);
    formData.append("img", product.img);
    formData.append("brand", product.brand);
    formData.append("no_of_wishlists", product.no_of_wishlists);
    formData.append("no_of_orders", product.no_of_orders);
    formData.append("no_of_cart", product.no_of_cart);

    axios
      .put(`http://13.50.236.236/super-admin/edit-product-details/${id}/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
          
        },
      })
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

          Navigate("/productlist");
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    Editingproduct();
  }, []);
  
  return (
    <>
      <div className="container-fluid">
        <h1>Edit product</h1>
        <section className="form-section">
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlInput1"
            >
              <Form.Control
                type="text"
                placeholder="Product_Title"
                name="product_title"
                className="input-field"
                onChange={editData}
                value={product.product_title}
              />

              <Form.Control
                type="text"
                placeholder="Description"
                name="description"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.description}
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
                className="input-field"
                onChange={editData}
                value={product.no_of_products}
              />

              <Form.Control
                type="number"
                placeholder="Actual price"
                name="actual_price"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.actual_price}
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
                className="input-field"
                onChange={editData}
                value={product.selling_price}
              />

              <Form.Control
                type="text"
                placeholder="Colour"
                name="color"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.color}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="sku_code"
                name="sku_code"
                autoFocus
                className="input-field"
                value={product.sku_code}
                onChange={editData}
              />

              <Form.Control
                type="file"
                placeholder="Image1"
                name="img"
                autoFocus
                className="input-field"
                onChange={editDataimage}
               
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="file"
                placeholder="Image2"
                name="img"
                autoFocus
                className="input-field"
                onChange={editDataimage}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="Sub Category"
                name="sub_category"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.sub_category.id}
              />

              <Form.Control
                type="number"
                placeholder="category"
                name="category"
                autoFocus
                className="input-field"
                value={product.category.id}
                onChange={editData}
              />
            </Form.Group>

            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="brand"
                name="brand"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.brand.id}
              />
              <Form.Control
                type="number"
                placeholder="no_of_cart"
                name="no_of_cart"
                autoFocus
                className="input-field"
                value={product.no_of_cart}
                onChange={editData}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control
                type="number"
                placeholder="no_of_orders"
                name="no_of_orders"
                autoFocus
                className="input-field"
                onChange={editData}
                value={product.no_of_orders}
              />
              <Form.Control
                type="number"
                placeholder="no_of_wishlists"
                name="no_of_wishlists"
                autoFocus
                className="input-field"
                value={product.no_of_wishlists}
                onChange={editData}
              />
            </Form.Group>
            <div className="col-md-12">
              <button
                className="btn btn-primary"
                type="submit"
                style={{ float: "right", margin: "0rem 1rem" }}
              >
                Submit
              </button>
            </div>
          </Form>
        </section>
      </div>
    </>
  );
};

export default ProductEditScreen;
