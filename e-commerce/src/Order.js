import "./Order.css";
import jacket from "./images/jacket.png";
import del from "./images/del.png";
import logo from "./images/logo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
import whatsapp from "./images/whatsapp.png";
import instagram from "./images/instagram.png";
import gmail from "./images/gmail.png";
import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
function Order() {
  const sendEmail = () => {
    emailjs.send('service_phdrfzg', 'template_j3wte84', {
      to_email: 'badranrasha685@gmail.com',
      message: 'Hello, this is a static message sent from the Contact Us form.'
    }, 'bsgzj8RCp8iMedk0g')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };
  const [cartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("cartItems")) || []);

 function deleteProductFromLocalStorage(id) {
  const updatedProducts = cartItems.filter((product) => product._id !== id);
  localStorage.setItem('cartItems', JSON.stringify(updatedProducts));
}



function handleProductClick(id) {
  deleteProductFromLocalStorage(id);
  const updatedCartItems = cartItems.filter((item) => item._id !== id);
  setCartItems(updatedCartItems);
}


function clearLocalStorage() {
  localStorage.clear();
  window.location.reload();
}

  
 
  {
    console.log("cart", cartItems);
  }
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

      <div className="orders-div">
        <div className="order-style">
          {cartItems.map((item) => (
            <div className="order-det" key={item._id}>
              <div className="order-writing">
                <div className="order-title">
                  <h2>{item.title}</h2>
                </div>
                <p>Size: {item.size}</p>
                <p>Color: {item.color}</p>
                <p>Price: {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <div className="quantity">
                <img className="delete-icon" onClick={() => handleProductClick(item._id)} src={del} alt="" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="order-total">
          <div>
            <p>Total:</p>
          </div>
          <div>
            <p>$33.3</p>
          </div>
        </div>
        <div className="order-pay">
          <div>
            <p>Payement Method:</p>
          </div>
          <div>
            <p>Cash on delivery</p>
          </div>
        </div>
        <button className="order-check" onClick={() => sendEmail()}>Place Order</button>
         <button className="orderalldelete" onClick={()=>clearLocalStorage()}>Delete Order</button>
      </div>

      <div>
        <div className="footer">
          <div className="footer-first">
            <p className="footer-first-p">Home </p>

            <p className="footer-first-p">Winter Collection </p>
            <p className="footer-first-p">Summer Collection </p>
          </div>

          <div className="footer-second">
            <p className="footer-second-p"> @ Copy Right: 2023</p>
            <p className="footer-second-p">Powered by: Codi Team</p>
          </div>

          <div>
            <p className="footer-second-p"> Stay IN TOUCH:</p>
            <div className="footer-links">
              <button className="button-footer-background">
                <img className="images-buttons-footer" src={whatsapp} alt="" />
              </button>
              <button className="button-footer-background">
                <img className="images-buttons-footer" src={facebook} alt="" />
              </button>
              <button className="button-footer-background">
                <img className="images-buttons-footer" src={instagram} alt="" />
              </button>
              <button className="button-footer-background">
                <img className="images-buttons-footer" src={gmail} alt="" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
