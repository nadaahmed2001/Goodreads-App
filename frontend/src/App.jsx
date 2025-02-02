import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";
import Register from "../components/Authentication/SignUp/Register";
import Logged from "../components/Authentication/Logged";
import Home from "./Pages/Home/Home";

// import HomePage from './Pages/Home/HomePage'; //testing
import AdminLogin from "./Pages/Admin/AdminLogin";
import NotFound from "./Pages/NotFound404/NotFound";
import Categories from "./Pages/Admin/Categories";
import ManageBooks from "./Pages/Admin/ManageBooks";
import Authors from "./Pages/Admin/Authors";
import AuthorsBook from "../components/Authors-Book/AuthorsBook";

import "bootstrap/dist/css/bootstrap.min.css";
import Login from "../components/Authentication/SignIn/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* <Route path = "/" element = {<HomePage />} /> //testing */}
          <Route path='/AdminLogin' element={<AdminLogin />} />
          {/* <Route path = "/" element = {<HomePage />} /> //testing */}
          {/* <Route path="/Admin" element={<AdminLogin />} /> */}
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/AuthorsBook' element={<AuthorsBook />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
