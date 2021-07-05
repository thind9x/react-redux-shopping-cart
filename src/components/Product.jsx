import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
const Product = ({ getcart, dispatch }) => {
  console.log(getcart.products);
  console.log(getcart.carts);
  console.log(getcart.numberCart);

  useEffect(() => {
    let sub = true;
    axios
      .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/products")
      .then((res) => {
        if (sub) {
          dispatch({
            type: "GET_ALL_CART",
            payload: res.data,
          });
        }
      });
    return () => {
      sub = false;
    };
  }, []);
  return (
    <div className="container">
      <Link to="/cart">My Cart</Link> ({getcart.numberCart})
      <div className="row">
        {getcart.products.map((item) => (
          <div key={item.id} className="col-sm-3">
            <p>{item.title}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "ADD_CART",
                  payload: item,
                });
              }}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getcart: state.getcart,
});
export default connect(mapStateToProps)(Product);
