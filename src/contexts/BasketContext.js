import React, { createContext, useState, useMemo } from 'react';
import PRODUCTS from 'productData';

// New contexts definining hook variable and setters
export const BasketOpenContext = createContext({
    isBasketOpen: false,
    setisBasketOpen: () => {}
});

export const BasketItemsContext = createContext({
  basketItems: [],
  setBasketItems: () => []
}); 

export const BasketProvider = ({ children }) => {  

const [basketItems, setBasketItems ] = useState([]);
const [isBasketOpen, setIsBasketOpen ] = useState(false);

const isBasketOpenValue = useMemo(
  () => ({ isBasketOpen, setIsBasketOpen }), 
  [isBasketOpen]
);

const basketItemsValue = useMemo(
  () => ({ basketItems, setBasketItems }), 
  [basketItems]
);

return (
     <BasketOpenContext.Provider value={ isBasketOpenValue }>
      <BasketItemsContext.Provider value={ basketItemsValue }>
        {children}
      </BasketItemsContext.Provider>
    </BasketOpenContext.Provider>
  )
}