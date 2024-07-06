import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './pages/signup/Signup.jsx';
import Signin from './pages/signin/Signin.jsx';
import Landing from './pages/landing/Landing.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/user' element={<Landing />} />
        <Route path='/*' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
