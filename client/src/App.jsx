import { Route, Routes } from 'react-router-dom'; // Correct import
import LandingPage from './components/LandingPage';
import LoginPage from './pages/login';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
