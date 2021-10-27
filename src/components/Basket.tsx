import React, { useState, useEffect, useContext, createContext } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { BasketOpenContext, BasketItemsContext } from '../contexts/BasketContext';
const Basket = (props: IBasket) => {

  // Current basket state from Props
  const [ isBasketOpen, setIsBasketOpen ] = useContext(BasketOpenContext);

  return (
    <div className={`basket${ isBasketOpen ? ` basket-active` : ``} `}>
      <header className="basket__header">
        <h3 className="title is-5">Basket</h3>
        <FontAwesomeIcon className="basket__close" onClick={ (e) => {
        setIsBasketOpen(false)
     } } icon={faTimes} />
      </header>
      <div className="basket__items">
        <p>{`
         ${props.itemCount} item${ (props.itemCount >= 0 )  ? `s` : ``}
         in your basket`}</p>
      </div>
    </div>
  )
};

interface IBasket {
  handleClose: any;
  items: any[];
  itemCount: number;
}

export default Basket;