
import "./Order.css";
import jacket from "./images/jacket.png";
import del from "./images/del.png";
import logo from "./images/logo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
import whatsapp from "./images/whatsapp.png";
import instagram from "./images/instagram.png";
import gmail from "./images/gmail.png";
import React, { useState } from 'react';

function Order() {
  const [count, setCount] = useState(1);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    setCount(count + 1);
  };


  return (
    <>
      <div className="navbar-container">
        <div>
          <img className="logoimg" src={logo} alt="" srcset="" />
        </div>

        <div className="navigation-buttons">
          <p className="nav-buttons">Home</p>

          <p className="nav-buttons">Collection</p>
        </div>
        <div className="last-header">
          <p className="nav-buttons">sign out </p>
          <img src={cartlogo} className="cartlogo" alt="" />
        </div>
      </div>
     
      <p className="Orders-page">Orders</p>
     

      <div className="orders-all">

      <img className="order-image" src={jacket} alt="" />
      <p className="Img-desc"> Black Jacket</p>
      <div className="order-flex">
      <div className="counter-order">


      <div className="count-button">
      <p className="borderrA">
      <button className="count-button__decrease" onClick={handleDecrease}>
        -
      </button>
      <span className="count-button__quantity">{count}</span>
      <button className="count-button__increase" onClick={handleIncrease}>
        +
      </button>
      </p>
    </div>
     

      </div>
      <img className="del-icon" src={del} alt="" />
      <p className="order-price">$12.1</p>
      </div>
    </div>




    <div className="orders-all">
      
      <img className="order-image" src={jacket} alt="" />
      <p className="Img-desc"> Black Jacket</p>
      <div className="order-flex">
      <div className="counter-order">
      <div className="count-button">
      <p className="borderrA">
      <button className="count-button__decrease" onClick={handleDecrease}>
        -
      </button>
      <span className="count-button__quantity">{count}</span>
      <button className="count-button__increase" onClick={handleIncrease}>
        +
      </button>
      </p>
    </div>
        
      </div>
      <img className="del-icon" src={del} alt="" />
      <p className="order-price">$12.1</p>
      </div>
    </div>
    
    <div className="order-total">
    <p>Total</p>
    <p>$33.3</p>
    </div>
    <button className="order-check">Proceed Checkout</button>



        <div>


        <div className='footer'>

<div className='footer-first'>

  <p className='footer-first-p'>Home </p>
 
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

    </>
  );
}

export default Order;
