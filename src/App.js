import ProductDetail from './Components/ProductDetail';
import ProductList from './Components/ProductList';
import { Link, Route, Routes } from 'react-router-dom';
import Cart from './Components/Cart';
import OrderConfirm from './Components/OrderConfirm';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      {/* Navigation bar with Bootstrap styling */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to={'/'} className='navbar-brand'>ProductList</Link>
          <div className="d-flex">
            <Link to={'/cart'} className='btn btn-outline-primary ms-3'>View Cart</Link>
          </div>
        </div>
      </nav>

      {/* Main content area */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/details/:id" element={<ProductDetail />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<OrderConfirm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
