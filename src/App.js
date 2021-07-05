// phuongmychi.vn

import React, { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Product from "./components/Product";
import Cart from "./components/Cart";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const Menu = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Product} />
        <Route path="/cart" exact component={Cart} />
      </Switch>
    </Router>
  );
};
const App = ({ getcart, dispatch }) => {
  return (
    <div>
      <Menu />
    </div>
  );
};
const mapStateToProps = (state) => ({
  getcart: state.getcart,
});
export default connect(mapStateToProps)(App);
