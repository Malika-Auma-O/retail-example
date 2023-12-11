import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  // Load the basket from localStorage when it renders initially
  const initialBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const [basket, setBasket] = useState(initialBasket);

  return (
    <div className="App">
      <h1>Shopping Basket</h1>
      <div>
        <h2>Available Items</h2>
        <ul>
          {ItemList.map((item) =>{
            return (
              <li key={item.id}>
                {item.name} - €{item.price}
                <button>Add to Basket</button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h2>Basket</h2>
      </div>
    </div>
  );
}

export default App;
