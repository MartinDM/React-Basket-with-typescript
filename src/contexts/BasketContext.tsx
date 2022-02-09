import { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import PRODUCTS, { IProduct } from '../productData';

export const BasketContext = createContext<IBasketContext>({});
 
export const BasketProvider = ( props ) => {

  const [products, setProducts] = useState(PRODUCTS);
  const [basketItems, setBasketItems] = useState<any[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketQty, setBasketQty] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  
  const filteredProducts = (searchTerm) => {
    const regex = new RegExp( searchTerm.trim(), 'gi');
    console.log(searchTerm);
    return products.filter( (product) => {
      return product.name.match(regex);
    })
  }
  const filterProductsByName = useCallback(name => {
    setProducts( filteredProducts(name) )
  }, [products]);

  const removeProductFromCartAtIndex = useCallback(index => {}, []);

  const addProductToCart =  useCallback(product => {
    const newCart = [...basketItems, product ]
    setBasketItems( newCart ); 
  }, [basketItems]);


  useEffect(() => {
    setTotalValue(0)
  }, [basketItems, products]);
 
  const providerValue = useMemo(
      () => ({
          products,
          basketItems,
          isBasketOpen,
          basketQty,
          totalValue,
          actions: { 
            setProducts,
            filterProductsByName,
            setIsBasketOpen,
            setBasketItems,
            setBasketQty,
            setTotalValue,
            addProductToCart,
            removeProductFromCartAtIndex
          }
      }),[
          basketItems, isBasketOpen, basketQty, totalValue,
          filterProductsByName, setIsBasketOpen, setBasketItems,
          setBasketQty, setTotalValue, addProductToCart, removeProductFromCartAtIndex
      ]
  );

  return (
    <BasketContext.Provider
      value={providerValue}>
      {props.children}
    </BasketContext.Provider>
  )
};


interface IBasketContext {
  products?: [],
  basketItems?: [],
  isBasketOpen?: false,
  basketQty?: 0,
  totalValue?: 0,
  actions?: {
    setProducts: () => void,
    filterProductsByName: () => void,
    setIsBasketOpen: () => void,
    setBasketItems:  () => void,
    setBasketQty?:  () => void,
    setTotalValue: () => void,
    setTotalQty?: () => void,
    addProductToCart: () => void,
    removeProductFromCartAtInd: () => void,
  }
}

export default BasketContext;