
import './App.css';
import { Route, Routes,BrowserRouter } from 'react-router-dom';
import Order from './Order';
import Home from './Home';
import ProductsPage from './ProductsPage';
import Product from './Product';
import Dashboard from './Dashbord';
import WinterDashboard from "./WinterDashboard"
import Login from './login';
import Signup from './signup';

function App() {
 

  return (
    <BrowserRouter>
    <Routes>
      
        <Route path='Login' element={<Login />} />
        <Route path='Signup' element={<Signup />} />
        <Route path='Order' element={<Order />} />
        <Route path='/' element={<Home />} />
        <Route path='ProductsPage/:category_id' element={<ProductsPage />} />
        <Route path='Product/:productId' element={<Product />} />
        <Route path='Dashboard' element={<Dashboard />} />
        <Route path='Winter' element={<WinterDashboard />} />
       
    </Routes>
    </BrowserRouter>
  );
}

export default App;
