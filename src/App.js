import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductList from './components/product/ProductList';
import "bootstrap/dist/css/bootstrap.min.css";
import Checkout from './components/checkout/Checkout';
import Login from './components/auth/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />}></Route>
        <Route path="/checkout" element={<Checkout />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
