import React, { useContext, createContext, useState } from 'react';

export const BasketContext = createContext();

export const BasketProvider = ({ children }) => {
  const [isBasketOpen, setIsBasketOpen] = useState(false);
 
  return (
     <BasketContext.Provider value={[isBasketOpen, setIsBasketOpen]}>
       {children}
    </BasketContext.Provider>
  )
}