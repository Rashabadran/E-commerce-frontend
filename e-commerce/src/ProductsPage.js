import './ProductsPage.css';
import imagess from './images/jacket.png';
import imagesHover from './images/Vector.png';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import logo from "../src/images/logo.png"
import cartlogo from "../src/images/cartlogo.png"
import facebook from "../src/images/facebook.png"
import whatsapp from "../src/images/whatsapp.png"
import instagram from "../src/images/instagram.png"
import gmail from "../src/images/gmail.png"

function ProductsPage() {
  const [cardDatas, setCardDatas] = useState([]);
  const [cardImages, setCardImages] = useState([]);
  const category_id = useParams();
  const [images,setimages]=useState({})
  const [title,setTitle]=useState("")
  const loadAllProducts = async () => {
    const res = await axios.get(`http://localhost:3030/product/productbyCategory/${category_id.category_id}`);
    setCardDatas(res.data);
    setCardImages(res.data.map((item,index) => item.image[0]));
  };


 
  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadTitle = async () => {
    const res = await axios.get(`http://localhost:3030/cat/${category_id.category_id}`);
    setTitle(res.data.name)
  };

{console.log(title)}
 
  useEffect(() => {
    loadTitle();
  }, []);
  
  return (
    
    <div className="allProductsss">

    <div className='navbar-container'>

        <div>
          <img className='logoimg' src={logo} alt="" srcset="" />
        </div>



        <div className='navigation-buttons'>

          <a href="/Home"> <p className='nav-buttons'>Home</p></a>
           <a href="/Home/#about-Us"><p className='nav-buttons'>About Us</p></a>
           <a href="/Home/#winterCollection"><p className='nav-buttons'>Collection</p></a>

        </div>
        <div className='last-header'>
          <p className="nav-buttons">sign in </p>
          <img src={cartlogo} className="cartlogo" alt="" />

        </div>




     
      </div>
      <div className="allProductsPage">
      <div className="mainTitleProduct">{title}</div>
      <div className="card-list">
        {cardDatas.map((item, index) => (
          <div className='product-card' key={item._id}>
            <Link to={`/Product/${item._id}`}>
              <img
                className="allProductsImage"
                src={cardImages &&cardImages[index]?.url}
                alt={item.title}
              />
            </Link>
            <div className="backcolorOfProduc">
            <p className="allProductsTitle">{item.title}</p>
            <div className="price">
            {item.price == item.priceAfterDiscount  ? <h3>{item.price}$</h3> : 
              <div className="price"> 
                <h3>{ item.priceAfterDiscount}$</h3> 
                <h4>{item.price}$</h4>
              </div>
            }
           </div>
           </div>
          </div>
        ))}
      </div>
    </div>
     <div className='footer'>

        <div className='footer-first'>

         <Link to={`/Home`}> <p className='footer-first-p'>Home </p></Link>
          <a href="/Home/#about-Us"><p className='footer-first-p'> About Us </p></a>
          <a href="/Home/#winterCollection"><p className='footer-first-p' >Winter Collection </p></a>
          <a href="/Home/#summerCollection"><p className='footer-first-p' >Summer Collection </p></a>





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
  }export default ProductsPage;