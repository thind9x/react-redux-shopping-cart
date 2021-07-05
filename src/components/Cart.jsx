import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = ({ getcart, dispatch }) => {
  console.log(getcart.products);
  console.log(getcart.carts);
  console.log(getcart.numberCart);

  useEffect(() => {
    let sub = true;
    axios
      .get("https://60d2e16c858b410017b2e624.mockapi.io/api/v1/products")
      .then((res) => {
        dispatch({
          type: "GET_ALL_CART",
          payload: res.data,
        });
      });
  }, []);
  return (
    <div className="container">
      <Link to="/">Product</Link>

      <div className="row">
        {getcart.carts.map((item) => (
          <div key={item.id} className="col-sm-3">
            <p>{item.name}</p>
            <button
              onClick={() => {
                dispatch({
                  type: "DELETE_CART",
                  payload: item.quantity - item.quantity,
                });
              }}
            >
              Remove from cart
            </button>
          </div>
        ))}
      </div>
      <div>
        <h3>My Cart</h3>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  getcart: state.getcart,
});
export default connect(mapStateToProps)(Cart);
