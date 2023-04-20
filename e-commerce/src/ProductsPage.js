import './ProductsPage.css';
import imagess from './images/jacket.png';
import imagesHover from './images/Vector.png';
import React, { useState ,useEffect} from 'react';
import axios from 'axios';
function ProductsPage() {



const [cardDatas, setCardDatas] = useState([]);
const [cardImages, setCardImages] = useState([]);



 

  const loadAllProducts = async () => {
    const res = await axios.get('http://localhost:3030/product/product');
    setCardDatas(res.data);
    setCardImages(res.data.map((item,index) => item.image[0]));
   
  };
 
  useEffect(() => {
    loadAllProducts();
  }, []);
  
  return (
    <div className="allProducts">
      <p className="mainTitleProduct">Men Jackets</p>
      <div className="card-list">
        {cardDatas.map((item, index) => (
          <div key={item._id}>
            <img
              className="allProductsImage"
              src={cardImages[index]?.url}
              alt={item.title}
             
            />
         
           
            <p className="allProductsTitle">{item.title}</p>
            <p className="allProductsPrice">$ {item.price} USD</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;