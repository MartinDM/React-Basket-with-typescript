import React, { useEffect, useState, useContext } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faTrash } from "@fortawesome/free-solid-svg-icons";
import BasketContext from "../contexts/BasketContext";
import { calcTotalCost } from "../utils";
import { IProduct } from "productData";

const Basket = (props) => {

  const { basketItems, basketQty, isBasketOpen, actions } = useContext(BasketContext);

  useEffect(() => {
    const qtyInBasket = basketItems.length;
    actions.setBasketQty(qtyInBasket);
  }, [basketItems]);

  const deleteItem: any = (id) => {
    const updatedBasketItems = basketItems?.filter(item => item.id !== id);
    actions.setBasketItems(updatedBasketItems)
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

    const total = calcTotalCost(basketItems);
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
        <input onClick={() => {

        }}
          className="btn btn--checkout button"
          type="button"
          value="Checkout" />
      </div>
    )
  };

  const basketQtyContent = () => {
    return !basketItems?.length
      ? 'Basket empty'
      : `${basketQty} item${basketQty === 1 ? '' : 's'}`;
  };

  return (
    <div className={`basket${isBasketOpen ? ` basket-active` : ``}`}>
      <header className="basket__header">
        <h3 className="title is-5 mb-0">Basket</h3>
        <FontAwesomeIcon
          className="basket__close"
          onClick={() => {
            actions.setIsBasketOpen(false);
          }}
          icon={faTimes}
        />
        <p className="basket__count">
          {basketQtyContent()}
        </p>
      </header>

      {basketItems?.length ? (
        <div className="columns">
          <div className="column has-text-right has-text-weight-bold">
            <p className="basket__qty-title">Qty</p>
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="basket__items-list">
        {basketItems &&
          basketItems?.map((i) => basketItemContent(i))}
      </div>

      {basketItemsTotalContent()}

    </div>
  );
};

interface IBasket {
  handleClose: any;
  items: any[];
  itemCount: number;
}

export default Basket;
