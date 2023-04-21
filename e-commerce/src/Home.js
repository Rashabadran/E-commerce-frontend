import './Home.css';
import logo from "../src/images/logo.png"
import cartlogo from "../src/images/cartlogo.png"
import slider1 from "../src/images/slider1.jpg"
import slider2 from "../src/images/slider2.jpg"
import slider3 from "../src/images/slider3.jpg"
import slider4 from "../src/images/slider4.jpg"
import jacket from "../src/images/jacket.png"
import rightarrow from "../src/images/arrowright.png"
import leftarrow from "../src/images/arrowleft.png"
import facebook from "../src/images/facebook.png"
import whatsapp from "../src/images/whatsapp.png"
import instagram from "../src/images/instagram.png"
import gmail from "../src/images/gmail.png"
import axios from 'axios';
import Arrow from "../src/images/Arrow.png"
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
function App() {

const [categoryFetching,setCategory]=useState([])
const [images,setimages]=useState({})
const loadCategories = async () => {
    const res = await axios.get('http://localhost:3030/cat/');
    setCategory(res.data);
  };
  

  useEffect(() => {
    loadCategories();
  }, []);

  let currentSlide = 0;

  function startSlider() {
    let imageCount = document.querySelectorAll(".imgg");

    if (imageCount.length === 0) {
      imageCount = document.querySelectorAll(".imgg");
      images.style.transform = `translateX(0px)`;
      return;
    }

    let images = document.querySelector("ul");
    images.style.transform = `translateX(-${currentSlide * 100}%)`;

    if (currentSlide === imageCount.length - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
  }

  setInterval(() => {
    startSlider();
  }, 5000);



  const scroll = () => {
    var left = document.querySelector(".scroll-devs");
    left.scrollBy(280, 0)
  }


  const scrollr = () => {
    var right = document.querySelector(".scroll-devs");
    right.scrollBy(-380, 0)
  }



  const scrollsec = () => {
    var left = document.querySelector(".scroll-devos");
    left.scrollBy(380, 0)
  }


  const scrollrsec = () => {
    var right = document.querySelector(".scroll-devos");
    right.scrollBy(-380, 0)
  }







  return (
    <div className="App">

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




      <div className='slideshow-container'>

        <ul>
          <li><img className='imgg' src={slider1} alt="image one" /></li>
          <li><img className='imgg' src={slider2} alt="image two" /></li>
          <li><img className='imgg' src={slider3} alt="image three" /></li>

          <li><img className='imgg' src={slider4} alt="image four" /></li>
        </ul>



      </div>




      <div className='winter-collection'>

        <p className='heading-collection'>winter collection </p>

        <div className='scroll-collection'>
          <div className='parent-arrow'>

            <button className='leftarrow' onClick={() => scrollr()}><img className='arrows-heights' src={leftarrow} /> </button>
          </div>


          <div className='cover'>
      
            <div className='scroll-devs'>
  { categoryFetching.filter(item => item.season === "winter").map((item, index) => (
    <div key={item._id} className='child'>
    <Link to={`/ProductsPage/${item._id}`}>
      <img className='child-image' src={item.image.url} alt={item.name} /></Link>
      <button className='child-image-button'>{item.name} <img src={Arrow} alt="" srcSet="" /></button>
    </div>
  ))}
</div>



          </div>


          <div className='parent-arrow'><button className='leftarrow' onClick={() => scroll()}><img className='arrows-heights' src={rightarrow} /></button></div>

        </div>






      </div>








      <div className='winter-collection'>

        <p className='heading-collection'>Summer collection </p>

        <div className='scroll-collection'>
          <div className='parent-arrow'>

            <button className='leftarrow' onClick={() => scrollrsec()}><img className='arrows-heights' src={leftarrow} /> </button>
          </div>
           

          <div className='cover'>
            <div className='scroll-devos'>
             
            {categoryFetching.filter(item => item.season === "summer").map((item, index) => (
          <div key={index} className='child'>
              <Link to={`/ProductsPage/${item._id}`}>
      <img className='child-image' src={item.image.url} alt={item.name} /></Link>
            <button className='child-image-button'>{item.name} <img src={Arrow} alt="" srcSet="" /></button>
          </div>
        ))}
                        </div>



          </div>


          <div className='parent-arrow'><button className='leftarrow' onClick={() => scrollsec()}><img className='arrows-heights' src={rightarrow} /></button></div>

        </div>






      </div>






      <div className='pablo-description'>

        <p className='description-header'>PABLO</p>
        <p className='description-description'>Welcome to PABLO, your one-stop shop for stylish and affordable men's clothing. Our carefully curated collection features the latest trends in men's fashion, including casual wear, business attire, and formal wear. </p>


        <div className='description-butt'>

          <button className='description-buttons'>Read more...</button>
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

export default App;
