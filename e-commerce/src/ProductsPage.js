import './ProductsPage.css';
import imagess from './images/jacket.png';
import imagesHover from './images/Vector.png';
import React, { useState } from 'react';

function ProductsPage() {

  const cardData = [
  {
    id: 1,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 19.99,
    imageHover:imagesHover,
  },
  {
    id: 2,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 29.99,
    imageHover:imagesHover,
  },
  {
    id: 3,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 29.99,
    imageHover:imagesHover,
  },
  {
    id: 4,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 29.99,
    imageHover:imagesHover,
  },
   {
    id: 5,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 29.99,
    imageHover:imagesHover,
  },
   {
    id: 6,
    title: "Jacket with Hoodie Style",
    image: imagess,
    price: 29.99,
    imageHover:imagesHover,
  },
  // Add more card data objects here as needed
];


const [cardImages, setCardImages] = useState(cardData.map((item) => item.image));

  const handleMouseOver = (index) => {
    const newImages = [...cardImages];
    newImages[index] = cardData[index].imageHover;
    setCardImages(newImages);
  };

  const handleMouseOut = (index) => {
    const newImages = [...cardImages];
    newImages[index] = cardData[index].image;
    setCardImages(newImages);
  };

  return (
    <div className='allProducts'>
      <p className='mainTitleProduct'> Men Jackets</p>
       <div className="card-list">
      {cardData.map((item,index)=>{
        return(
          <div key={item.id}>
           <img className="allProductsImage" src={cardImages[index]} alt={item.title} onMouseOver={() => handleMouseOver(index)}
              onMouseOut={() => handleMouseOut(index)} />
           <p className='allProductsTitle'>{item.title}</p>
           <p className='allProductsPrice'>$ {item.price} USD</p>
           </div>
           
        );
      })}
    </div>
    </div>
   
     
  
  );
}

export default ProductsPage;