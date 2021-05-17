import {
  useState,
  useEffect,
  useContext,
  ReactEventHandler,
  ChangeEvent,
  MouseEvent,
  SyntheticEvent,
} from "react";
import "./Product.scss";
import { BasketContext } from '../contexts/BasketContext';

const Product = (props: IProduct) => {

  const [ qty, setQty] = useState("1");
  const { name, id, description, price } = props;
  const [ isBasketOepn, setIsBasketOpen ] = useContext(BasketContext);

  const toggleBasket = (q: ChangeEvent<HTMLInputElement>) => {
    console.log(`added ${qty} of ${name} `);
  };

  const handleQty = (e: SyntheticEvent) => {
    let newQty: string =
      (e.target as HTMLInputElement).innerText === "+"
        ? (parseInt(qty) + 1).toString()
        : (parseInt(qty) - 1).toString();

    if (parseInt(newQty) <= 0) {
      newQty = "1";
    }
    setQty(newQty);
  };

  const handleAdd = (e: SyntheticEvent) => {
    e.preventDefault();
    setIsBasketOpen(true)
  }

  const handleQtyInput = (e: SyntheticEvent) => {
    setQty((e.target as HTMLInputElement).value);
  };

  return (
    <div className="product p-1">
      <div className="product-details">
        <h2 className="title is-4 mb-0 product__title">{name}</h2>
        <p className="product__price">
          <strong>{price}</strong>
        </p>
        {description && <p className="product__description">{description}</p>}
      </div>
      <div className="y">
        <div className="columns">
          <div className="column">
            <div className="product__buy">
              <div className="field">
                <label className="label">Qty</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    placeholder=""
                    onChange={(e) => {
                      handleQtyInput(e);
                    }}
                    value={qty}
                  />
                </div>
              </div>
              <button
                className="button is-ghost product__qty"
                onClick={(e) => {
                  handleQty(e);
                }}
              >
                -
              </button>
              <button
                className="button is-ghost product__qty"
                onClick={(e) => {
                  handleQty(e);
                }}
              >
                +
              </button>
              <button
                className="button is-primary product__add"
                onClick={handleAdd}
                > Add
                <span className="visually-hidden">{name}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export interface IProduct {
  name: String;
  id: Number;
  description?: String;
  img?: String;
  price: Number;
  setBasketOpen?: Function
}

export default Product;
