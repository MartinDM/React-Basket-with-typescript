import React, { useContext, useState, useEffect } from "react";
import PRODUCTS from "../productData";
import Product from "../components/Product";

const Shop = ( props: IShop ) => {
  
  return (
    <div className="container">
      <div className="columns">
      {PRODUCTS.map((product, i) => (
        <div className="column">
          <Product
            name={product.name}
            description={product.description}
            id={product.id}
            key={i}
            price={product.price} 
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
