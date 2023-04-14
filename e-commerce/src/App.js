import image from './t-shirt 1.png';
import './App.css';
import React, { useState } from 'react';

function App() {

  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isClicked, setIsClicked] = useState(false);
  const [Sizes, setSizes] = useState();
  
  const sizes = [
    { name: 'S', id: 1 },
    { name: 'M', id: 2 },
    { name: 'L', id: 3 },
    { name: 'XL', id: 4 },
    { name:'XXL', id: 5 },
  ];


  const colors = [
    { name: 'Black', id: 1 },
    { name: 'Red', id: 2 },
    { name: 'Blue', id: 3 },
    { name: 'White', id: 4 },
    { name:'Green', id: 5 },
  ];

   


  const sizeListItems = sizes.map(size =>
    <button onClick={() => handleClick(size.id)}
     style={{ backgroundColor: isClicked ? 'black' : 'white',color: isClicked ? 'white' : 'black'}} className="sizeDetailsName" key={size.id}>{size.name}</button>
  );

  const colorListItems = colors.map(colors =>
    <button className="sizeDetailsName " key={colors.id}>{colors.name}</button>
  );
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
 

  function handleClick(id) {
    setIsClicked(!isClicked);
    const newSizes = sizes.map(size =>
    size.id === id ? { ...size, selected: !size.selected } : size
  );
  setSizes(newSizes);
  }

  return (
    <div className="imagesProduct">
        <img src={image} className="App-logo" alt="t-shirt" />
    <div className="details">
        <p className="title">Men Casual Summer Shirt</p>
        <p className="price">$10.00 USD</p>
        <p className="size">Size</p>
        <p className="sizeDetails">
        {sizeListItems}
        </p>
        <p className="size">Color</p>
        <p className="sizeDetails">
        {colorListItems}
        </p>
      <div className="quantity-button">
      <p className='quantityText'>Quantity</p>
      <button className="quantity-button__decrease" onClick={handleDecrease}>
        -
      </button>
      <span className="quantity-button__quantity">{quantity}</span>
      <button className="quantity-button__increase" onClick={handleIncrease}>
        +
      </button>
    </div>
    </div>

      
    </div>
  );
}

export default App;
