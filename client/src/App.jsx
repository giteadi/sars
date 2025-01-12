import { Route, Routes } from 'react-router-dom'; // Correct import
import LandingPage from './components/LandingPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/Register';
import ProductPage from './pages/ProductPage';
import BlogPage from './pages/Blogs';
import SingleProduct from './pages/SingleProduct';
import Cart from './components/Cart';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/product' element={<ProductPage/>}/>
        <Route path='/blogs' element={<BlogPage/>}/>
        <Route path='/singleProduct/:id' element={<SingleProduct/>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
    </div>
  );
}

export default App;
