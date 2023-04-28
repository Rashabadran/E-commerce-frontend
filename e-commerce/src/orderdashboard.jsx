import "./orderdashboard.css";
import logo from "./images/logo.png";
import cartlogo from "./images/cartlogo.png";
import facebook from "./images/facebook.png";
import whatsapp from "./images/whatsapp.png";
import instagram from "./images/instagram.png";
import gmail from "./images/gmail.png";
import React, { useCallback, useState, useEffect } from "react";
import emailjs from "emailjs-com";
import NavBar from "./NavBar";
import Footer from "./Footer";
import del from "./images/del.png";
import swal from "sweetalert";
import { toast, ToastContainer, useToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Orderdashbord() {
  const [data, setData] = useState([]);
  const [cartStuff, setCartStuff] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:3030/api/orders");
      const json = await response.json();
      setData(json);
      setCartStuff(json.map((item) => item.cart));
    }

    fetchData();
  }, []);

  return (
    <>
      <NavBar />
      <ToastContainer />
      <p className="Ordersdash-page">Orders</p>

      <div className="ordersdash-div">
        <div className="orderdash-style">
          {data.map((item) => (
            <div className="orderdash-det" key={item._id}>
              <div className="orderdash-writing">
                <div className="orderdash-title desOrder">
                  <h2>Order: {item._id}</h2>
                </div>
                <div className="cartit">
                  <h3>Cart:</h3>
                  <ul>
                    {item.cart.map((cartItem) => (
                      <li key={cartItem._id}>
                        <p>Title: {cartItem.title}</p>
                        <p>Size: {cartItem.size}</p>
                        <p>Color: {cartItem.color}</p>
                        <p>Quantity: {cartItem.quantity}</p>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="desOrderdash">
                  Payment type: {item.payment_type}
                </p>
                <p className="desOrderdash">Total price: {item.total_price}$</p>
                <p className="desOrderdash">
                  Phone_number: {item.phone_number}
                </p>
                <p className="desOrderdash">Address: {item.address}</p>
                <p className="desOrderdash">Created at: {item.created_at}</p>
              </div>
              <div className="deldash">
                <img
                  // onClick={() => handleProductClick(item._id)}
                  src={del}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default Orderdashbord;
