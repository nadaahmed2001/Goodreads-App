import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import SignIn from '../components/Authentication/SignIn/SignIn'
import SignUp from "../components/Authentication/SignUp/SignUp";
import Books from "./Books";
import Rating from "./Rating";
import Home from './Pages/Home/Home';
<<<<<<< HEAD
import AdminLogin from './Pages/Admin/AdminLogin';
=======
import AdminDashboard from './Pages/Admin/AdminDashboard';
// import HomePage from './Pages/Home/HomePage'; //testing
>>>>>>> Nada
import NotFound from './Pages/NotFound404/NotFound';
import Categories from './Pages/Admin/Categories';
import ManageBooks from './Pages/Admin/ManageBooks';
import Authors from './Pages/Admin/Authors';



function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/AdminLogin" element={<AdminLogin />} />
=======
          {/* <Route path = "/" element = {<HomePage />} /> //testing */}
          <Route path="/Admin" element={<AdminDashboard />} />
>>>>>>> Nada
          <Route path="/Books" element={<Books />} />
          <Route path="/Rating" element={<Rating />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/ManageBooks" element={<ManageBooks />} />
          <Route path="/Authors" element={<Authors />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;