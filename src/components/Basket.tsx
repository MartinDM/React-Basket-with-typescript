import React, { useEffect, useState } from "react";
import "./Basket.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { BasketContext, useBasket } from '../contexts/BasketContext';

const Basket = (props) => {
  
  const { 
    actions: { setIsBasketOpen, setBasketQty },
    state: { basketItems, isBasketOpen, basketQty }
  } = useBasket();

  const [totalQty, setTotalQty] = useState(0);
  
  const calcTotalQty: any = () => {
    if ( basketItems.length === 0 ) return 0;
    return basketItems.reduce( (acc, curr) => acc + curr.qty);
  }

  useEffect(() => {
    const totalQty = calcTotalQty();
    console.log(totalQty)
    setTotalQty(totalQty)
  }, [basketItems]);

  const basketItemContent = (item) => {
    if (item) {
    <div> 
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p><span>{item.qty}</span></p>
    </div>
    }
  };
 
  return (
    <div className={`basket${ isBasketOpen ? ` basket-active` : ``} `}>
      <header className="basket__header">
        <h3 className="title is-5">Basket</h3>
        <FontAwesomeIcon className="basket__close" onClick={ (e) => {
          console.log(basketItems)
        setIsBasketOpen(false);
     } } icon={faTimes} />
      </header>
      <div className="basket__items">
        <p>{`
         ${totalQty} item${ totalQty !== 1 ? `s` : ``}
         in your basket`}</p>
      </div>
      <div className="basket__list">
          { basketItems &&
            basketItems.map( (item) => {
              console.log(basketItems)
              basketItemContent(item)
            })
          }
      </div>
    </div>
  )
};

interface IBasket {
  handleClose: any;
  items: any[];
  itemCount: number;
}

export default Basket;