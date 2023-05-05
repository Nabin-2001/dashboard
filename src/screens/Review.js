import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { FaRegStar } from "react-icons/fa";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
const url = "http://13.50.248.3";
const Review = () => {
  const [review, setreview] = useState([]);
  const { id } = useParams();
  function reviewdata() {
    axios
      .get(`http://13.50.248.3/super-admin/all-reviews-to-a-product/${id}/`)
      .then((res) => {
        setreview(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    reviewdata();
  }, []);
  return (
    <div className="container p-3">
      <div className="row">
        <div className=" col-md-6">
          {
            <>
              <img
                style={{ width: "30rem", height: "34rem" }}
                src={url + review.thumbnail}
              />
            </>
          }
        </div>
        <div className="col col-md-6">
          {
            <>
              <h3>{review.product_title}</h3>
              <p style={{ fontWeight: "500" }}>{review.description}</p>
              {/* <h2><Rating name="half-rating-read" value={5}  readOnly /></h2> */}
            </>
          }
        </div>
        {review.product_reviews &&
          review.product_reviews.map((item) => {
            console.log(item);
            return (
              <>
                <div className="py-4">
                  <div
                    style={{
                      backgroundColor: "green",
                      width: "50px",
                      textAlign: "center",
                      borderRadius: "10px",
                      color: "white",
                      display: "inline-block",
                    }}
                  >
                    {item.ratings}
                    <sup>
                      <FaRegStar color="white" size={18} />
                    </sup>
                  </div>
                  <span> {item.subject}</span>
                  <br></br>
                  <h5>{item.description}</h5>
                  <p style={{ wordSpacing: "1px", color: "grey" }}>
                    {item.user.name}{" "}
                    <IoCheckmarkDoneCircleSharp color="green" size={17} />{" "}
                    {item.created_date}
                  </p>
                  <span><Link>Reply</Link></span>
                </div>
                <hr></hr>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default Review;
