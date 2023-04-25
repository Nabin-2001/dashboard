import axios from "axios";
import React, { useEffect, useReducer, useState } from "react";
import { Button, Dropdown, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { toast } from "react-toastify";
import { Store } from "../Store";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { getError } from "../utils";
import "../styles/product.css";
import Modal from "react-bootstrap/Modal";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, products: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    case "CREATE_REQUEST":
      return { ...state, loadingCreate: true };
    case "CREATE_SUCCESS":
      return {
        ...state,
        loadingCreate: false,
      };
    case "CREATE_FAIL":
      return { ...state, loadingCreate: false };
    case "DELETE_REQUEST":
      return { ...state, loadingDelete: true, successDelete: false };
    case "DELETE_SUCCESS":
      return {
        ...state,
        loadingDelete: false,
        successDelete: true,
      };
    case "DELETE_FAIL":
      return { ...state, loadingDelete: false, successDelete: false };

    case "DELETE_RESET":
      return { ...state, loadingDelete: false, successDelete: false };

    default:
      return state;
  }
};

const Productlist = () => {
  const [
    { loading, products, error, loadingCreate, loadingDelete, successDelete },
    dispatch,
  ] = useReducer(reducer, {
    products: [],
    loading: true,
    error: "",
  });

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [companyList, setCompanyList] = useState([{}]);
  const [subcategorieList, setCategorieList] = useState([]);

  const [dropdownHandler, setDropdownHandler] = useState("");


  useEffect(()=>{
     axios.get("http://16.170.252.94:8000/super-admin/all-products/")
     .then((res)=>{
      console.log("response data",res)
     })
     .catch((err)=>{
      console.log("err data contain",err)
  })
  },[])
  useEffect(() => {
    // const fetchData = async () => {
    //   dispatch({ type: "FETCH_REQUEST" });
    //   try {
    //     const result = await axios.get(
    //       "http://16.170.252.94:8000/super-admin/all-products/"
    //     );
    //     console.log("data contain",result)
    //     dispatch({ type: "FETCH_SUCCESS", payload: result.data.data });
       
    //   } catch (err) {
    //     dispatch({ type: "FETCH_FAIL", payload: err.message });
    //     console.log(err)
    //   }
    // };
    // fetchData();
      
   
     

    const fetchDatas = async () => {
      return axios
        .get("http://16.170.252.94:8000/super-admin/all-category/")
        .then((result) => {
          const res = result.data.data;
          setCompanyList(res);
          return res;
        });
    };
    console.log(companyList);
    const country = [new Set(companyList.map((item) => item.id))];
    console.log(country);

    const dropdownHandler = async () => {
      return axios
        .get(
          `http://16.170.252.94:8000/super-admin/particular-category-sub-category-list/${6}/`
        )
        .then((results) => {
          const ress = results.data.data;
          console.log(ress);
          setCategorieList(ress);
          return ress;
        });
    };

    fetchDatas();

    dropdownHandler();
  }, []);

  const createHandler = async () => {
    if (window.confirm("Are you sure to create ?")) {
      try {
        dispatch({ type: "CREATE_REQUEST" });
        const { data } = await axios.post(
          "http://16.170.252.94:8000/super-admin/add-product/",
          {}
        );
        toast.success("product created successfully");
        dispatch({ type: "CREATE_SUCCESS" });
        navigate(`product/${data.product.id}`);
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "CREATE_FAIL",
        });
      }
    }
  };

  const deleteHandler = async (product) => {
    if (window.confirm("Are you sure to delete?")) {
      try {
        await axios.delete(
          `http://16.170.252.94:8000/super-admin/delete-product/${product.id}/`
        );
        toast.success("product deleted successfully");
        dispatch({ type: "DELETE_SUCCESS" });
      } catch (err) {
        toast.error(getError(error));
        dispatch({
          type: "DELETE_FAIL",
        });
      }
    }
  };

  return (
    <div className="container-fluid">
      <Row>
        <Col>
          <h1 style={{ padding: "20px" }}>Products List</h1>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={handleShow}>
              Create Productlist
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sub-Category</th>
              <th>Brand</th>
              <th>Total-products</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.product_title}</td>
                <td>{product.selling_price}/-</td>
                <td>{product.category.category}</td>
                <td>{product.sub_category.sub_category}</td>
                <td>{product.brand.brand_name}</td>
                <td>{product.no_of_products}</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    Edit
                  </Button>
                  &nbsp;
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Creating Category List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Title</Form.Label>
              <Form.Control type="text" placeholder="Product Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="Product Description" />
            </Form.Group>

            <br />

            {/* <div className="row">
              <div className="col">
                <label>category</label>
                <br />
                <select
                  className="from-control"
                  onClick={(e) => setDropdownHandler(e.target.value)}
                  defaultValue={"muzeef"}
                >
                  <option value="">Choose category</option>

                  {companyList.map((company) => (
                    <option value={company.id} key={company.id}>
                      {company.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col">
                <label>Sub-category</label>
                <select className="from-control">
                  <option value="">Choose sub-category</option>
                  {subcategorieList.map((companys) => (
                    <option value={companys.id} key={companys.id}>
                      {companys.sub_category}
                    </option>
                  ))}
                </select>
              </div>
            </div> */}

            <br />

            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>No of Products</Form.Label>
              <Form.Control type="text" placeholder="No of Products" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Actual Price</Form.Label>
              <Form.Control type="text" placeholder="Product Title" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Selling Price</Form.Label>
              <Form.Control type="text" placeholder="Product Title" />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Please Select File</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
          </Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Please select color </Form.Label>
            <Form.Control type="text" placeholder="color" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Please select brand </Form.Label>
            <Form.Control type="text" placeholder="brand" />
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Productlist;
