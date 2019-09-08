import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import data from './data';

// Components
import Navigation from './components/Navigation';
import Products from './components/Products';
import ShoppingCart from './components/ShoppingCart';
import ProductContext from './contexts/ProductContext';
import CardContext from './contexts/CartContext';

function App() {
  const initialCart = () =>
    JSON.parse(window.localStorage.getItem('cart')) || [];

  const [products] = useState(data);
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = item => {
    if (cart.includes(item)) {
      return;
    }
    setCart([...cart, item]);
  };

  const removeItem = id => {
    setCart(cart.filter(item => item.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addItem }}>
      <CardContext.Provider value={{ cart, removeItem }}>
        <div className="App">
          <Navigation />
          <Route exact path="/" component={Products} />
          <Route path="/cart" component={ShoppingCart} />
        </div>
      </CardContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
