import { Route, Routes } from 'react-router-dom'; // Correct import
import LandingPage from './components/LandingPage';
import LoginPage from './pages/login';
import RegisterPage from './pages/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
