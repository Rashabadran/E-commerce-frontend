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
import { Link } from 'react-router-dom';

function NavBar(){
return(
<div className='navbar-container'>

        <div>
          <img className='logoimg' src={logo} alt="" srcset="" />
        </div>



        <div className='navigation-buttons'>

          <a href="/Home"><p className='nav-buttons'>Home</p></a>
          <a href="/Home/#about-Us"><p className='nav-buttons'>About Us</p></a>
           <a href="/Home/#winterCollection"><p className='nav-buttons'>Collection</p></a>

        </div>
        <div className='last-header'>
          <p className="nav-buttons">sign in </p>
          <img src={cartlogo} className="cartlogo" alt="" />

        </div>

        </div>
);
}
export default NavBar;