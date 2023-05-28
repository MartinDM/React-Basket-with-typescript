import {
  useState,
  useEffect,
  useContext
} from "react";
import "./Product.scss";
import BasketContext from '../contexts/BasketContext';
import { calcTotalQty } from "utils";

const Product = (props) => {

  const { name, id, description, price, image, unit } = props;
  const [buyQty, setBuyQty] = useState(1);
  const { basketItems, actions } = useContext(BasketContext);

  // Direct qty entry
  const handleQtyInput = (e) => {
    const value = e.currentTarget.value;
    if (!+value) return;
    setBuyQty(+value);
  };

  // Increment qty
  const handleQtyIncrement = (type) => {
    let newQty = (type === "inc") ? +buyQty + 1 : +buyQty - 1
    setBuyQty(newQty > 1 ? newQty : 1);
  };

  const handleAdd = () => {
    actions.setIsBasketOpen(true);
    actions.addProductToCart(id, buyQty)
    setBuyQty(1)
  }

  useEffect(() => {
    console.log('++')
    setBuyQty(1);
  }, [basketItems, actions.setBasketItems]);

  console.log(buyQty)

  return (
    <>
      <div className="product p-1">
        <div className="product-details">
          <div className="product__img mb-2" style={{ backgroundImage: `url(images/${image})` }}></div>
          <h2 className="title is-4 mb-0 product__title">{name}</h2>
          <p className="product__price has-text-weight-bold">
            £{price}
            {unit && <span className="product__unit">{`${unit}`}</span>}
          </p>
          {description && <p className="product__description mt-2 mb-2">{description}</p>}
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
                    value={buyQty}
                    onChange={(e) => {
                      handleQtyInput(e);
                    }}
                  />
                </div>
              </div>
              <button
                className="button is-ghost product__qty"
                onClick={() => handleQtyIncrement("dec")}
              >
                -
              </button>
              <button
                className="button is-ghost product__qty"
                onClick={() => handleQtyIncrement("inc")}
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