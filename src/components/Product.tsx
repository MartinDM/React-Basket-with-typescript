import {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import "./Product.scss";
import { BasketContext } from '../contexts/BasketContext';

const Product = (props: IProduct) => {

  const { name, id, description, price } = props;
  const [ isBasketOpen, setIsBasketOpen ] = useContext(BasketContext);
  const [ qty, setQty ] = useState(1);

  const toggleBasket = (q: ChangeEvent<HTMLInputElement>) => {
    console.log(`added ${qty} of ${name} `);
  };
 

  const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('hit',e.currentTarget.value);
    const { value } = e.currentTarget;
    const isNumber = !isNaN(+ value);
    if ( !isNumber ) return;
    console.log('is number')
    setQty( parseInt(value) )
    console.log('qty now', qty)
  };

  const handleQty = (e: SyntheticEvent) => {
    console.log(e)
    let newQty: number =
      (e.target as HTMLInputElement).innerText === "+"
        ? (qty + 1)
        : (qty - 1);
      setQty(newQty > 1 ? newQty : 1);
  };

  const handleAdd = (e: SyntheticEvent) => {
    console.log(qty);
    setIsBasketOpen(true);
  }

  // useEffect( () => {
  //   setQty(qty)
  // }, [qty])

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
                    value={qty}
                    onChange={handleQtyInput}
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
