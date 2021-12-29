import { useState }from 'react';
import { BasketContext } from './context';
import { IProduct } from "../../productData";

export const BasketProvider = ({ children }) => {
  const [basketItems, setBasketItems] = useState<IProduct[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketQty, setBasketQty] = useState(0);
  const value = {
    state: { basketItems, isBasketOpen, basketQty },
    actions: { setIsBasketOpen, setBasketItems, setBasketQty },
  };
 
  return (
    <BasketContext.Provider
      value={value}>
      {children}
    </BasketContext.Provider>
  )
}

