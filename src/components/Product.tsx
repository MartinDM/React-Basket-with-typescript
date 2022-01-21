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
import { calcTotalQty } from "utils";

const Product = (props) => {
  const { name, id, description, price, unit } = props;
  const [qty, setQty] = useState(0);

  const {
    actions: { setIsBasketOpen, setBasketItems, setBasketQty },
    state: { isBasketOpen, basketItems, basketQty }
  } = useBasket();  
 

  // Direct qty entry
  const handleQtyInput = (e) => {
    const { value } = e.currentTarget;
    if ( !(+value) ) return;
    setQty( (+value) ? parseInt(value) : 0 );
  };
  
  // Increment qty
  const handleQty = (type) => {
    let newQty: number = type === "inc" ? qty + 1 : qty - 1;
    setQty(newQty >= 1 ? newQty : 0 );
  };

  const handleAdd = (e) => {
    if ( qty === 0 ) return;
    setIsBasketOpen(true);

    // Construct an object containing new item details
    const newItem: IProduct = PRODUCTS.filter((p) => p.id === id && p).map((p) => {
      var o = Object.assign({}, p);
      o.qty = qty;
      return o;
    })[0];

    const isBasketEmpty = basketItems.length === 0;
    if ( isBasketEmpty ) return setBasketItems([newItem]);
    const isItemInBasket = basketItems.some( item => item.id === id );
    
    if ( isItemInBasket ) {
      const updatedBasketItems: IProduct[] = basketItems.map( (item, i) => {
        if( item.id !== id ) {
          return item 
        } 
        return item.qty = item.qty + qty
      });
      return setBasketItems(updatedBasketItems);
    } else {
      const updatedBasketItems: IProduct[] = [
        ...basketItems,
        newItem
      ];
      return setBasketItems(updatedBasketItems);
    }
  };

  useEffect(() => {
    setQty( calcTotalQty )
  },[basketItems, setBasketItems]);

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
                      value={ qty }
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
                <input
                  type="button"
                  className="btn button is-primary"
                  onClick={ handleAdd }
                  value="Add"
                />
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
