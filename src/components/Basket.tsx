import { useContext } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import BasketContext from "../contexts/BasketContext";
import { calcTotalCost } from "../utils";
import { BasketItem } from "./BasketItem/BasketItem";

const Basket = (props) => {


  const { basketItems, basketQty, isBasketOpen, actions } = useContext(BasketContext);

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
        {
          !!basketItems.length &&
          <button onClick={() => { }}
            className="btn btn--checkout button"
            value="Checkout">Checkout</button>
        }
      </div>
    )
  };

  const basketQtyContent = () => {
    return !basketItems?.length
      ? 'Basket empty'
      : `${basketQty} item${basketQty > 1 ? 's' : ''}`;
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
          basketItems.map((i) => <BasketItem {...i} />
          )
        }
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
