import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  // Load the basket from localStorage when it renders initially
  // If the data doesn't exist or can't be parsed, default to an empty array.
  const initialBasket = JSON.parse(localStorage.getItem("basket")) || [];
  const [basket, setBasket] = useState(initialBasket);

  // function to add item to the list
  const handleAddItem= (itemId) => {
    const itemToAdd = ItemList.find((item) => item.id === itemId);
    const itemIndex = basket.findIndex((item) => item.id === itemId);

    // Check if the item is already in the basket, update quantity if true, else add a new item
    if (itemIndex !== -1) {
      const updatedBasket = basket.slice();
      updatedBasket[itemIndex].quantity += 1;
      setBasket(updatedBasket);
    } else {
      const newItem = { id: itemToAdd.id, name: itemToAdd.name, price: itemToAdd.price, quantity: 1 };
      setBasket(basket.concat(newItem));
    }
  };

  // function to remove items from the list
  const handleRemoveItem = (itemId) => {
    const itemIndex = basket.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
      const updatedBasket = basket.slice();
      if (updatedBasket[itemIndex].quantity > 1) {
        // If the item has a quantity greater than 1, decrement the quantity
        updatedBasket[itemIndex].quantity -= 1;
      } else {
        // If the item has a quantity of 1, remove it from the basket
        updatedBasket.splice(itemIndex, 1);
      }
      setBasket(updatedBasket);
    }
  }

  // function to calculate total price of items in the basket
  const getTotalPrice = () => {
    return basket.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  useEffect(() => {
    // Save the basket in local storage whenever the basket changes
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  // Function to handle the buy button click
  const handleBuy = () =>{
    // Create an XML representation of the basket
    let xmlData = "<basket>";
    basket.forEach((item) => {
      xmlData += `<item id="${item.id}" quantity="${item.quantity}"/>`;
    });
    xmlData += "</basket>";
    console.log(xmlData);

    // Check if the total exceeds €100 and apply discount
    if (getTotalPrice() > 100) {
      console.log("You have qualified for a 10% discount.");
    }
  }

  return (
    <div className="App">
      <h1>Shopping Basket</h1>
      <div>
        <h2>Available Items</h2>
        <ul>
          {ItemList.map((item) =>{
            return (
              <li key={item.id}>
                {item.name}  - €{item.price}
                <button
                onClick={()=>handleAddItem(item.id)}
                >Add to Basket</button>
              </li>
            )
          })}
        </ul>
      </div>
      <div>
        <h2>Basket</h2>
        <ul>
          {basket.length === 0 ? "Your basket is empty" :
          <div>
            {basket.map((item) => {
              return (
                <li key={item.id}>
                  {item.name} (Quantity: {item.quantity}) : €{item.price}
                  <br/>
                  <button onClick={()=>handleRemoveItem(item.id)}>Remove Item</button>
                </li>
              )
            })}
          </div>
          }
        </ul>
        <p>Total Price: €{getTotalPrice().toFixed(2)}</p>
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
}

export default App;
