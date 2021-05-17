import React, { useContext } from "react";
import "../App.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBag } from "@fortawesome/free-solid-svg-icons";
import { BasketContext } from '../contexts/BasketContext';

const BasketIcon = <FontAwesomeIcon icon={faShoppingBag} />;

const Nav = (props: INav) => {

  const [ isBasketOepn, setIsBasketOpen ] = useContext(BasketContext);

  const handleBasketToggle = () => {
    console.log('toggling');
    setIsBasketOpen(true)
  }

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
              <a onClick={ (e) => {
                  e.preventDefault();
                  handleBasketToggle();
                }}>
                { BasketIcon } Basket ({ props.itemCount })
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface INav {
  itemCount: number;
}

export default Nav;
