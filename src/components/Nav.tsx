import React, { useContext, useEffect, useState } from "react";
import "../App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { calcTotalQty, calcTotalCost } from "../utils";
import { BasketContext } from '../contexts/BasketContext';

const Nav = () => {

  const { basketQty, isBasketOpen, actions, basketItems } = useContext(BasketContext);

  const BasketIcon = <FontAwesomeIcon icon={faShoppingBag} />;
  const handleBasketToggle = () => actions.setIsBasketOpen(!isBasketOpen)

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
                <a onClick={handleBasketToggle}>
                  {BasketIcon} Basket ({basketQty})
                  {
                    basketItems.length > 0 &&
                    ` £${calcTotalCost(basketItems)}`
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
