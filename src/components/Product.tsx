import {
  useState,
  useEffect,
  useContext,
  ChangeEvent,
  ChangeEvent,
  SyntheticEvent,
} from "react";
import "./Product.scss";
import { IProduct } from '../productData';
import { BasketOpenContext, BasketItemsContext } from '../contexts/BasketContext';

const Product = (props) => {

  const { name, id, description, price  } = props;
  const [ isBasketOpen, setIsBasketOpen ] = useContext(BasketOpenContext);
  const [ basketItems, setBasketItems ] = useContext(BasketItemsContext);
  const inventory = useContext(BasketItemsContext);
  const [ qty, setQty ] = useState(1);
 
  console.log(inventory)
  // Direct qty entry
  const handleQtyInput = (e: ChangeEvent<HTMLInputElement>) => { 
    const { value } = e.currentTarget;
    const isNumber = !isNaN(+ value);
    if ( !isNumber ) return;
    setQty( parseInt(value));
  };

  // Increment qty
  const handleQty = (e: SyntheticEvent) => {
    console.log(qty)
    let newQty: number =
      (e.target as HTMLInputElement).innerText === '+'
        ? ( (qty + 1) )
        : ( (qty - 1) );
      setQty( newQty > 1 ? newQty : 1 );
  };

  
  const handleAdd = (e) => {
    const basketItems: IBasketItem[] = inventory.forEach( (product: IProduct) => {
       if ( product.id === id ) {
         product.qty = qty;
       }
    }); 
    setBasketItems(basketItems);
    setIsBasketOpen(true)
  };

  useEffect( () => {
     console.log(qty)
  }, [qty])

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
                onClick={ handleAdd }
                > Add
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
