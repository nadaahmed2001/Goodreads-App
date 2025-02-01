import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import SignIn from '../components/Authentication/SignIn/SignIn'
import SignUp from "../components/Authentication/SignUp/SignUp";
import Register from '../components/Authentication/SignUp/Register';
import Logged from '../components/Authentication/Logged';
import Books from "./Books";
import Rating from "./Rating";
import Home from './Pages/Home/Home';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import NotFound from './Pages/NotFound404/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../components/Authentication/SignIn/Login';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Rating" element={<Rating />} />
          <Route path="/sign-up" element={<SignUp/>} />
          <Route path="/sign-in" element={<SignIn/>} /> 
          <Route path="/register" element={<Register/>} /> 
          <Route path="/login" element={<Login/>} /> 
          <Route path="/logged-in" element={<Logged/>} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;