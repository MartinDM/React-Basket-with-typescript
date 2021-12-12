import { useContext } from 'react';
import { BasketContext } from './context';

export const useBasket = () => {
  return useContext(BasketContext);
}