import React, { useEffect, useState } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { BasketContext, useBasket } from "../contexts/BasketContext";
import { url } from "inspector";

const Basket = (props) => {
  const {
    actions: { setIsBasketOpen, setBasketQty },
    state: { basketItems, isBasketOpen, basketQty },
  } = useBasket();

  const [totalQty, setTotalQty] = useState(0);
  const hasBasketItems = !basketItems?.length;

  const calcTotalQty = (): number =>
    basketItems?.length
      ? basketItems.reduce((acc, curr) => acc + curr.qty, 0)
      : 0;

  useEffect(() => {
    setTotalQty(calcTotalQty());
  }, [basketItems]);

  const basketItemContent = (item) => {
    const { image, qty, name, unit, price, description } = item;
    return (
      <>
        <div className="columns mb-5">
          <div
            className="column is-two-fifths basket__product-img"
            style={{ backgroundImage: `url(\'images/${image}')` }}
            >
            <img src={`images/${image}`} alt={`${name} - ${description}`} />
          </div>
          <div className="column">
            <h3 className="title is-5">{name}</h3>
            <p>£{(+price).toFixed(2)} 
            /{unit ? unit : 'each'}</p>
          </div>
          <div className="column">
            <p className="has-text-right">
              <span>{qty}</span>
            </p>
          </div>
        </div>
      </>
    );
  };

  const basketItemsTotalContent = () => {
    if ( basketItems?.length < 0 ) return;

    const total = basketItems.reduce( (p, item) => p + (item.qty * item.price), 0);
    return (
      <div className="basket-total is-italic">
        <div className="columns">
          <div className="column is-two-fifths">
            <h3 className="title is-5">Total</h3>
          </div>
          <div className="column has-text-right">
            <p className="title is-5">£{total}</p>
          </div>
        </div>
      </div>
    )
  };
  
  const basketQtyContent = () => {
    const isPlural = totalQty > 1;
    const content = !basketItems?.length
      ? "Basket empty"
      : `${totalQty} item${isPlural ? "s" : ""}`;
      return <p>{content}</p>
    
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
      </header>
      { basketQtyContent() }
      { basketItems?.length ? (
        <div className="columns">
          <div className="column has-text-right has-text-weight-bold">
            <p>Qty</p>
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
