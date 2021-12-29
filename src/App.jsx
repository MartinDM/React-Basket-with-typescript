import './App.scss';
import 'normalize.css';
import Shop from './pages/Shop';
import Checkout from './pages/Checkout';
import Nav from './components/Nav';
import Basket from './components/Basket';
import { BasketProvider } from './contexts/BasketContext';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const App = () => {

  return (
    <Router>
          <BasketProvider> 
              <Nav />
              <main>
                <Switch>
                  <Route path={"/"} exact key="9" component={Shop} />
                  <Route path={"/checkout"} key="88" component={Checkout} />
                  <Route path={"/shop"} 
                  render={(props) => (
                    <Shop {...props} />
                    )} />
                </Switch>
              </main>
              <Basket
                handleClose={() => { console.log('test')} } /> 
        </BasketProvider>
    </Router>
  );
}

export default App;
