import React, { useContext, useState, useEffect } from "react";
import PRODUCTS from "../productData";
import Product from "../components/Product";

//import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Shop = ( props: IShop ) => {

  const [basket, setBasket] = useState([]);


  const handleQty = (e: any) =>  {
    console.log(e.target.value);
    // Update basket with item    
  }

  const handleAdd = () => { 
  }

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
