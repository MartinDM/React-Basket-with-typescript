import React, { useContext, useState, useEffect } from "react";
import Product from "../components/Product";
import PRODUCTS from "../productData";


const baseUrl = '/images/';

export const Shop = ( props: IShop ) => {
    return (
    <div className="container">
      <div className="columns">
      {PRODUCTS.map((p, i) => (
        <div className="column">
          <Product
            name={p.name}
            description={p.description}
            id={p.id}
            image={p.image}
            key={i}
            unit={p.unit}
            price={ (+p.price).toFixed(2) } 
            />
        </div>
      ))}
      </div>
    </div>
  );
};

export default Shop;

export interface IShop {
}