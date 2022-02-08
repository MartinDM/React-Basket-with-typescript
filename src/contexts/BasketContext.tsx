import { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import PRODUCTS, { IProduct } from '../productData';

const Context = createContext({});

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
          filteredProducts,
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
    <Context.Provider
      value={providerValue}>
      {props.children}
    </Context.Provider>
  )
}

export default Context;