import React, { useContext, useState, useEffect } from "react";
import Product from "../components/Product";
import PRODUCTS from "../productData";
import BasketContext from '../contexts/BasketContext';

const Shop = ( props: IShop ) => {

  const appContext =  useContext(BasketContext);  
 
    return (
    <div className="container">
      <div className="columns">
      {appContext.map((product, i) => (
        <div className="column">
          <Product
            name={product.name}
            description={product.description}
            id={product.id}
            key={i}
            price={ (+product.price).toFixed(2) } 
            />
        </div>
      ))}
      </div>
    </div>
  );
};

export interface IShop {
}

export default Shop;
