import {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import "./Product.scss";
import { IProduct } from "../productData";
import { BasketContext, useBasket } from "../contexts/BasketContext";
import PRODUCTS from "../productData";

const Product = (props) => {
  const { name, id, description, price } = props;
  const [qty, setQty] = useState(0);

  const {
    actions: { setIsBasketOpen, setBasketItems },
    state: { isBasketOpen, basketItems }
  } = useBasket();  

  // Direct qty entry
  const handleQtyInput = (e) => {
    const { value } = e.currentTarget;
    const isNumber = !isNaN(+value);
    if (!isNumber) return;
    setQty( !isNaN(parseInt(value)) ? parseInt(value) : 0 );
  };
  
  // Increment qty
  const handleQty = (type) => {
    let newQty: number = type === "inc" ? qty + 1 : qty - 1;
    setQty(newQty >= 1 ? newQty : 0 );
  };

  const handleAdd = (e) => {
    setIsBasketOpen(true);
    // Construct an object containing new item details
    const newItem = PRODUCTS.filter((p) => p.id === id && p).map((p) => {
      var o = Object.assign({}, p);
      o.qty = qty;
      return o;
    })[0];

    const updatedBasketItems = 
    basketItems.length === 0
      ? [ newItem ]
      : basketItems.map( (item) => {
        if ( item?.id === id ) {
          return {
            ...item,
            qty: item.qty + qty
          }
        } else { 
          basketItems.push(newItem);
        }
        }); 
    setBasketItems(updatedBasketItems);
  };

  useEffect(() => {
    console.log('basket items updated')
  },[basketItems]);

  return (
    <>
      <div className="product p-1">
        <div className="product-details">
          <h2 className="title is-4 mb-0 product__title">{name}</h2>
          <p className="product__price">
            <strong>{price}</strong>
          </p>
          {description && <p className="product__description">{description}</p>}
          {id && <p className="product__id">{id}</p>}
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
                      value={ !isNaN(qty) ? qty : 0 }
                      onChange={(e) => {
                        handleQtyInput(e);
                      }}
                    />
                  </div>
                </div>
                <button
                  className="button is-ghost product__qty"
                  onClick={(e) => {
                    handleQty("dec");
                  }}
                >
                  -
                </button>
                <button
                  className="button is-ghost product__qty"
                  onClick={(e) => {
                    handleQty("inc");
                  }}
                >
                  +
                </button>
                <button
                  className="button is-primary product__add"
                  onClick={handleAdd}
                >
                  {" "}
                  Add
                  <span className="visually-hidden">{name}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export interface IBasketItem extends IProduct {
  qty?: number;
}

export default Product;
