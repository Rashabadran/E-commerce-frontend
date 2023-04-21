
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Order from './Order';
import Home from './Home';
import ProductsPage from './ProductsPage';
import Product from './Product';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      
        <Route path='Order' element={<Order />} />
        <Route path='Home' element={<Home />} />
        <Route path='ProductsPage/:category_id' element={<ProductsPage />} />
        <Route path='Product/:productId' element={<Product />} />
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
