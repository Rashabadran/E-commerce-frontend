
import './Product.css';
import React, { useState } from 'react';
import axios from 'axios'
import { useEffect } from 'react'
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Product() {

  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [productId, setProductId] = useState('643ff2e94f3494a7e08b898f');
  
   

 useEffect(() => {
    loadSingleProduct();
  }, [productId]);

  useEffect(() => {
    setSizes(data.size || []);
  }, [data.size]);

    useEffect(() => {
    setColors(data.color || []);
  }, [data.color]);

   useEffect(() => {
    setImages(data.image || []);
  }, [data.image]);
  

  const loadSingleProduct = async () => {
    const res = await axios.get(`http://localhost:3030/product/productByID/${productId}`);
    console.log(res.data);
    setData(res.data);
  };

  

  const sizeListItems = sizes.map((sizes) => (
    <button
     
      
      className="sizeDetailsName"
      key={sizes.id}
    >
      {sizes}
    </button>
  ));

 


  const colorListItems = colors.map(colors =>
    <button  
  
     className="sizeDetailsName " key={colors.id}>
     {colors}
     </button>
  );
  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };
 

 

  return (
    <div className="imagesProduct">
  
   
 

   <Carousel interval={null} >
      {images.map((image, index) => (
        <Carousel.Item key={index} 
         prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true" />}
      nextIcon={<span className="carousel-control-next-icon" aria-hidden="true" />}>
          <img
        
            src={image.url}
             imageHeight={800}
            imageWidth={1000}
            className="imageProductResize"
            style={{ border: '3px solid black'}}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  

    <div className="details">
        <p className="title">{data.title}</p>
        <p className="price">${data.price} USD</p>
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
      <ul className='descriptionDetails'><li>{data.Description}</li></ul>
    </div>
    <div>
      <button className='cartButton'> Add to cart</button>
    </div>
    </div>

      
    </div>
  );
}

export default Product;