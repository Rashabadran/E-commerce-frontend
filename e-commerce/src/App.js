
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Order from './Order';
import Home from './Home';
import ProductsPage from './ProductsPage';
import Product from './ProductDetail';
import Dashboard from './Dashbord';


function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      
        <Route path='Order' element={<Order />} />
        <Route path='Home' element={<Home />} />
        <Route path='ProductsPage' element={<ProductsPage />} />
        <Route path='Product' element={<Product />} />
        <Route path='Dashboard' element={<Dashboard />} />
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
