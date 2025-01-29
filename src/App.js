
import './App.css';

import ProductDetail from './Components/ProductDetail';
import ProductList from './Components/ProductList';
import { Link, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
import OrderConfirm from  './Components/OrderConfirm';



function App() {
  return (
    <div className="App">
    
    <Link to={'/'} className='link'>ProductList</Link>
    <Link to={'/cart'} className='link'>View Cart </Link>
    
    <Routes>
       

        <Route path="/" element={<ProductList />} />
        <Route path="/details/:id" element={<ProductDetail />} />
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<OrderConfirm/>}></Route>
      </Routes>
    </div>
  );
}

export default App;