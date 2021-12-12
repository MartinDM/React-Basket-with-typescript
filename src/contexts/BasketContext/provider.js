import { useState } from 'react';
import { BasketContext } from './context';

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState([]);
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketQty, setBasketQty] = useState(0);
  const value = {
    state: { basketItems, isBasketOpen },
    actions: { setIsBasketOpen, setBasketItems },
  };
 
  return (
    <BasketContext.Provider
      value={value}>
      {children}
    </BasketContext.Provider>
  )
}