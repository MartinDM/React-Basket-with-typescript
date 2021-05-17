import React, { useState, useEffect, useContext, createContext } from "react";
import './App.scss';
import 'normalize.css';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Nav from './components/Nav';
import Basket from './components/Basket';
import {BasketProvider } from './contexts/BasketContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


function App() {
  const [items, setItems] = useState([]);
  return (
    <Router>
          <BasketProvider> 
          <div>
              <Nav itemCount={items.length} />
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
                itemCount={ items.length }
                items={items}
                handleClose={  () => {  console.log('test')} } />
          </div>
        </BasketProvider>
    </Router>
  );
}

export default App;
