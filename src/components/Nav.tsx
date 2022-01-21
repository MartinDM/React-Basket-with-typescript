import React, { useContext, useEffect, useState } from "react";
import "../App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { useBasket } from '../contexts/BasketContext';
import { calcTotalQty, calcBasketTotalCost } from "../utils";

const Nav = (props) => {
  
  const BasketIcon = <FontAwesomeIcon icon={faShoppingBag} />;

  const { 
    actions: { setIsBasketOpen, setBasketItems, setTotalQty },
    state: { basketItems, isBasketOpen, totalQty }
  } = useBasket();
 
  const handleBasketToggle = () =>  setIsBasketOpen(!isBasketOpen);

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
                  basketItems.length > 0 &&
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
