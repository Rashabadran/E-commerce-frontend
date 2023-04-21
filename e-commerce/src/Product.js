import './Product.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useParams } from 'react-router-dom';
import logo from "../src/images/logo.png"
import cartlogo from "../src/images/cartlogo.png"
import facebook from "../src/images/facebook.png"
import whatsapp from "../src/images/whatsapp.png"
import instagram from "../src/images/instagram.png"
import gmail from "../src/images/gmail.png"

function Product() {

  const [isActive, setIsActive] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [data, setData] = useState({});
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [images, setImages] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const productId = useParams();
  // const { productId } = match.params;
   {console.log(productId,"raneem")}

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
    try {
      const res = await axios.get(`http://localhost:3030/product/productByID/${productId.productId}`);
      console.log(res.data);
      setData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const sizeListItems = sizes.map((size) => (
    <button
      className="sizeDetailsName"
      key={size.id}
    >
      {size}
    </button>
  ));

  const colorListItems = colors.map((color) =>
    <button
      className="sizeDetailsName"
      key={color.id}
    >
      {color}
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

  console.log(data);
  console.log(sizes);
  console.log(colors);
  console.log(images);

  return (
    <div className="imagesProduct">
    <div className='navbar-container'>

        <div>
          <img className='logoimg' src={logo} alt="" srcset="" />
        </div>



        <div className='navigation-buttons'>

          <p className='nav-buttons'>Home</p>
          <p className='nav-buttons'>About Us</p>
          <p className='nav-buttons'>Collection</p>

        </div>
        <div className='last-header'>
          <p className="nav-buttons">sign in </p>
          <img src={cartlogo} className="cartlogo" alt="" />

        </div>




      </div>
      <div className='allProducts'>
      <Carousel interval={null}>
        {images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              src={image.url}
              imageHeight={800}
              imageWidth={1000}
              className="imageProductResize"
              style={{ border: '3px solid black' }}
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
      <div className='footer'>

        <div className='footer-first'>

          <p className='footer-first-p'>Home </p>
          <p className='footer-first-p'> About Us </p>
          <p className='footer-first-p'>Winter Collection </p>
          <p className='footer-first-p'>Summer Collection </p>





        </div>






        <div className='footer-second'>

          <p className='footer-second-p'> @ Copy Right: 2023</p>
          <p className='footer-second-p'>Powered by: Codi Team</p>


        </div>






        <div>


          <p className='footer-second-p'> Stay IN TOUCH:</p>
          <div className='footer-links'>
            <button className='button-footer-background' ><img className='images-buttons-footer' src={whatsapp} alt="" /></button>
            <button className='button-footer-background' ><img className='images-buttons-footer' src={facebook} alt="" /></button>
            <button className='button-footer-background' ><img className='images-buttons-footer' src={instagram} alt="" /></button>
            <button className='button-footer-background' ><img className='images-buttons-footer' src={gmail} alt="" /></button>



          </div>



        </div>


      </div>
    </div>
  );
}

export default Product;