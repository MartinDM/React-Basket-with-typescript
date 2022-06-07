import {
  useState,
  useEffect,
  useContext
} from "react";
import "./Product.scss";
import { IProduct } from "../productData";
import BasketContext from '../contexts/BasketContext';
import PRODUCTS from "../productData";
import { calcTotalQty } from "utils";
//import * as imgSrc from '../images';

const Product = (props) => {

  const { name, id, description, price, image, unit } = props;
  const [qty, setQty] = useState(0);
  const { basketItems, actions } = useContext(BasketContext);

  const isBasketEmpty = basketItems.length === 0;

  // Direct qty entry
  const handleQtyInput = (e) => {
    const value = e.currentTarget.value;
    console.log('input')
    if (!+value) return;
    setQty(+value);
  };

  // Increment qty
  const handleQty = (type) => {
    let newQty = type === "inc"
      ? +qty + 1
      : +qty - 1 > -1
        ? +qty - 1
        : 0;
    setQty(newQty >= 1 ? newQty : 0);
  };

  const handleAdd = () => {
    actions.addProductToCart(id, qty)
  }

  useEffect(() => {
    setQty(calcTotalQty);
    //console.log('new basket:', basketItems)
  }, [basketItems, actions.setBasketItems]);

  return (
    <>
      <div className="product p-1">
        <div className="product-details">
          <h2 className="title is-4 mb-0 product__title">{name}</h2>
          <p className="product__price has-text-weight-bold">
            £{price}
          </p>
          {description && <p className="product__description">{description}</p>}
          {id && <p className="product__id">{id}</p>}
        </div>

        <div className="columns">
          <div className="column">
            <div className="product__buy">
              <div className="field">
                <label className="label">Qty</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    value={qty}
                    onChange={(e) => {
                      handleQtyInput(e);
                    }}
                  />
                </div>
              </div>
              <button
                className="button is-ghost product__qty"
                onClick={() => handleQty("dec")}
              >
                -
              </button>
              <button
                className="button is-ghost product__qty"
                onClick={() => handleQty("inc")}
              >
                +
              </button>
              <input
                type="button"
                className="btn button is-primary"
                onClick={() => handleAdd()}
                value="Add"
              />
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default Product;