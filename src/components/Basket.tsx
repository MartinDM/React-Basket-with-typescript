import React, { useEffect, useState } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import { BasketContext, useBasket } from "../contexts/BasketContext";
import { calcTotalQty, calcBasketTotalCost } from "../utils";
import { Transition, CSSTransition, TransitionGroup } from 'react-transition-group';

const Basket = (props) => {
  const {
    actions: { setIsBasketOpen, setBasketItems, setBasketQty, setTotalQty },
    state: { basketItems, isBasketOpen, basketQty, totalQty },
  } = useBasket();

  const hasBasketItems = !basketItems?.length;


  useEffect(() => {
    setTotalQty(calcTotalQty(basketItems));
  }, [basketItems]);

  const duration = 300;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  }

const transitionStyles = {
  entering: { opacity: 1 },
  entered:  { opacity: 1 },
  exiting:  { opacity: 0 },
  exited:  { opacity: 0 },
};

  const deleteItem = (id) => {
    const updatedBasketItems = basketItems.filter( item => {
      console.log(item)
      return item.id !== id;
    });
    setBasketItems(updatedBasketItems)
  }

  const basketItemContent = (item) => {
    const { image, qty, name, unit, price, description, id } = item;
    return (
      <div className="columns">
          <div
            className="column is-two-fifths basket__product-img"
            style={{ backgroundImage: `url(\'images/${image}')` }}
            >
            <img src={`images/${image}`} alt={`${name} - ${description}`} />
          </div>
          <div className="column is-two-fifths">
            <h3 className="title is-5">{name}</h3>
            <p>£{(+price).toFixed(2)}  
             /{unit ? unit : 'each'}</p>
          </div>
          <div className="column">
            <p className="has-text-right">
              <span>{qty}</span>
            </p>
          </div>
          <div className="column has-text-right">
              <FontAwesomeIcon
              className="basket__delete"
              onClick={() => {
                deleteItem(id);
              }}
              icon={faTrash}
            />
          </div>
       </div> 
    );
  };
  
  const basketItemsTotalContent = () => {
    
    const total = calcBasketTotalCost(basketItems);

    return (
      <div className="basket-total pt-5">
        <div className="columns">
          <div className="column is-two-fifths">
            <h3 className="title is-5 has-text-weight-normal">Total</h3>
          </div>
          <div className="column has-text-right">
            <p className="title is-5 has-text-weight-bold">£{total}</p>
          </div>
        </div>
        <input onClick={ () => {

        }}
        className="btn btn--checkout button is-danger"
        type="button"
        value="Checkout" />
      </div>
    )
  };
  
  const basketQtyContent = () => {
    const isPlural = totalQty > 1;
    return !basketItems?.length
      ? "Basket empty"
      : `${totalQty} item${isPlural ? "s" : ""}`;
  };

  return (
    <div className={`basket${isBasketOpen ? ` basket-active` : ``} `}>
      <header className="basket__header">
        <h3 className="title is-5 mb-0">Basket</h3>
        <FontAwesomeIcon
          className="basket__close"
          onClick={() => {
            setIsBasketOpen(false);
          }}
          icon={faTimes}
        />
        <p className="basket__count">
        { basketQtyContent() }
        </p>
      </header>
      
      { basketItems?.length ? (
        <div className="columns">
          <div className="column has-text-right has-text-weight-bold">
            <p className="basket__qty-title">Qty</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="basket__items-list">
        { basketItems.length > 0 &&
          basketItems.map((i) => basketItemContent(i))}
      </div>

      { basketItemsTotalContent() }

    </div>
  );
};

interface IBasket {
  handleClose: any;
  items: any[];
  itemCount: number;
}

export default Basket;
