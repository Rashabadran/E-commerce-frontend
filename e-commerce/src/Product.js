
import './Product.css';
import Slideshow from "./SlideShow.jsx";
import React, { useState } from 'react';

function Product() {

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

  const images = [
  "https://m.media-amazon.com/images/I/610DOILk1jL._AC_UL1500_.jpg",
  "https://media.istockphoto.com/id/1210106212/photo/black-jacket-and-t-shirt-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=N1PmQECJcxIV9gF1JI2TTpZdhNpGmnQHCpDBjS2Vouk=",
  "https://img.freepik.com/premium-photo/mens-black-leather-jacket-isolated-white-background_125604-204.jpg",
];

   


  const sizeListItems = sizes.map(size =>
    <button onClick={() => handleClick(size.id)}
     style={{ backgroundColor: isClicked ? 'black' : 'white',color: isClicked ? 'white' : 'black'}} className="sizeDetailsName" key={size.id}>{size.name}</button>
  );

  const colorListItems = colors.map(colors =>
    <button  onClick={() => handleClick(colors.id)}
     style={{ backgroundColor: isClicked ? 'black' : 'white',color: isClicked ? 'white' : 'black'}} className="sizeDetailsName " key={colors.id}>{colors.name}</button>
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
   
     
  <Slideshow
    images={images}
    imageHeight={800}
    imageWidth={700}
    className="imageProductResize"
    style={{ border: '3px solid black'}}
  />
  

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
      <p className="borderr">
      <button className="quantity-button__decrease" onClick={handleDecrease}>
        -
      </button>
      <span className="quantity-button__quantity">{quantity}</span>
      <button className="quantity-button__increase" onClick={handleIncrease}>
        +
      </button>
      </p>
    </div>
    <div className='description'>
      <p className="descriptionTitle">Description</p>
      <ul className='descriptionDetails'><li>100% Cotton</li><li>20%polyester</li></ul>
    </div>
    <div>
      <button className='cartButton'> Add to cart</button>
    </div>
    </div>

      
    </div>
  );
}

export default Product;