import React, { useContext, useEffect, useState } from "react";
import "../App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { calcTotalQty, calcBasketTotalCost } from "../utils";
import BasketContext from '../contexts/BasketContext';

const Nav = (props) => {

  const { products } = useContext(BasketContext);
  
  console.log(products);
  const BasketIcon = <FontAwesomeIcon icon={faShoppingBag} />;
  const isBasketOpen = useContext(BasketContext);
  //const handleBasketToggle = () =>  //setIsBasketOpen(!isBasketOpen);
  const handleBasketToggle = () =>  {}

  return (
    <nav className="nav">
      <div className="container">
        <div className="columns">
          <div className="column">
            <ul className="nav-links">
              <li>
                <Link to="/shop">Shop</Link>
              </li>
              <li>
                <Link to="/checkout">Checkout</Link>
              </li>
              <li>
                <a onClick={ handleBasketToggle }>
                  { BasketIcon } Basket ({ totalQty }) 
                  {
                  props.basketItems.length > 0 &&
                  ` £${calcBasketTotalCost(basketItems)}`
                  }
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
