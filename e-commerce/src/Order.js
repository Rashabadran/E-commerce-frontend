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
import NavBar from "./NavBar";
import Footer from './Footer';
import swal from 'sweetalert';


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
  swal({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  buttons: ["Cancel", "Yes, delete it!"],
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    deleteProductFromLocalStorage(id);
  const updatedCartItems = cartItems.filter((item) => item._id !== id);
  setCartItems(updatedCartItems);
 
    swal("Poof! Your file has been deleted!", {
      icon: "success",
    });
     window.location.reload();
  } else {
    swal("Your Order is safe!");
  }
});
  
}


function clearLocalStorage() {
  swal({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  buttons: ["Cancel", "Yes, delete it!"],
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
    localStorage.clear();
 
    swal("Poof! Your file has been deleted!", {
      icon: "success",
    });
     window.location.reload();
  } else {
    swal("Your Order is safe!");
  }
});
  
}

  
 
  {
    console.log("cart", cartItems);
  }
  return (
    <>
      <NavBar/>

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
       <Footer/>
      </div>
    </>
  );
}

export default Order;
