import React, { useState, useEffect, useContext, createContext } from "react";
import './App.scss';
import 'normalize.css';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Nav from './components/Nav';
import Basket from './components/Basket';
import { BasketProvider } from './contexts/BasketContext'; 
import PRODUCTS from 'productData';
import { BasketItemsContext } from './contexts/BasketContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  const basketItems = useContext(BasketItemsContext).basketItems;
  console.log(basketItems)

  return (
    <Router>
          <BasketProvider>
          <div>
              <Nav itemCount={basketItems.length} />
              <main>
                <Switch>
                  <Route path={"/"} exact key="9" component={Shop} />
                  <Route path={"/checkout"} key="88" component={Checkout} />
                  <Route path={"/shop"} key="7" 
                  render={(props) => (
                    <Shop {...props} />
                    )} />
                </Switch>
              </main>
              <Basket
                itemCount={ basketItems.length }
                items={basketItems}
                handleClose={() => {  console.log('test')} } />
          </div>
        </BasketProvider>
    </Router>
  );
}

export default App;
