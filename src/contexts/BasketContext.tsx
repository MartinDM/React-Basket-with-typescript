import { useState, useEffect, createContext, useMemo, useCallback } from 'react';
import PRODUCTS, { IProduct } from '../productData';
interface IActionObj {
  setProducts: Function,
  filterProductsByName: Function,
  setIsBasketOpen: Function,
  setBasketQty: Function,
  setBasketValue: Function,
  setBasketItems: Function,
  addProductToCart: Function,
};
interface IBasketContext {
  products?: IProduct[],
  basketItems: IProduct[],
  isBasketOpen?: boolean,
  basketQty?: number,
  basketValue?: number,
  actions: IActionObj
}

export const BasketContext = createContext<IBasketContext>({
  products: [],
  basketItems: [],
  isBasketOpen: false,
  basketQty: 0,
  basketValue: 0,
  actions: {
    setProducts: () => { },
    filterProductsByName: () => { },
    setIsBasketOpen: () => { },
    setBasketItems: () => { },
    setBasketQty: () => { },
    setBasketValue: () => { },
    addProductToCart: () => { },
  }
});

export const BasketProvider = (props) => {

  const [products, setProducts] = useState(PRODUCTS);
  const [basketItems, setBasketItems] = useState<IProduct[] | any[]>([])
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [basketValue, setBasketValue] = useState(0);
  const [basketQty, setBasketQty] = useState(0);

  const filteredProducts = (searchTerm) => {
    const regex = new RegExp(searchTerm.trim(), 'gi');
    console.log(searchTerm);
    return products.filter((product) => {
      return product.name.match(regex);
    })
  }
  const filterProductsByName = useCallback(name => {
    setProducts(filteredProducts(name))
  }, [products]);

  const addProductToCart = useCallback((id, qty) => {
    if (qty === 0) return;
    const isBasketEmpty = basketItems.length === 0;

    const newItem: IProduct = PRODUCTS.filter((p) => p.id === id && p).map((p) => {
      var o = Object.assign({}, p);
      return {
        ...o,
        qty
      }
    })[0];

    if (isBasketEmpty) {
      return setBasketItems([newItem]);
    }

    const isItemInBasket = !!basketItems.find(i => i.id === id);
    if (isItemInBasket) {
      const updatedBasketItems = basketItems
        .map((item) => {
          return {
            ...item,
            qty: item.qty + qty
          }
        });
      setBasketItems([...updatedBasketItems])
    } else {
      setBasketItems([...basketItems, newItem])
    }
  }, [basketItems]);

  useEffect(() => {
    let qtyInBasket = 0;
    for (const item of basketItems) {
      qtyInBasket += item.qty;
    }
    setBasketQty(qtyInBasket);
  }, [basketItems]);

  const providerValue: any = useMemo(
    () => ({
      products,
      basketItems,
      isBasketOpen,
      basketQty,
      basketValue,
      actions: {
        setProducts,
        filterProductsByName,
        setIsBasketOpen,
        setBasketItems,
        setBasketQty,
        setBasketValue,
        addProductToCart
      }
    }), [products, basketItems, isBasketOpen, basketQty, basketValue, filterProductsByName, addProductToCart]
  );

  return (
    <BasketContext.Provider
      value={providerValue}>
      {props.children}
    </BasketContext.Provider>
  )
};

export default BasketContext;
