import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";
import Register from "../components/Authentication/SignUp/Register";
import Logged from "../components/Authentication/Logged";
import Home from "./Pages/Home/Home";
import BookList from "./Pages/Books/BookList";
import BookDetails from "./Pages/Books/BookDetails";

// import HomePage from './Pages/Home/HomePage'; //testing
import AdminLogin from "./Pages/Admin/AdminLogin";
import NotFound from "./Pages/NotFound404/NotFound";
import Categories from "./Pages/Admin/Categories";
import ManageBooks from "./Pages/Admin/ManageBooks";
import Authors from "./Pages/Admin/Authors";
import AuthorsBook from "../components/Authors-Book/AuthorsBook";
import AuthorDetails from "../components/Authors-Book/AuthorDetails";
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
          <Route path='/Register' element={<Register />} />
          <Route path='/Categories' element={<Categories />} />
          <Route path='/ManageBooks' element={<ManageBooks />} />
          <Route path='/Register' element={<Register />} />
          <Route path='/Authors' element={<Authors />} />
          {/* <Route path = "/" element = {<HomePage />} /> //testing */}
          {/* <Route path="/Admin" element={<AdminLogin />} /> */}
          <Route path='/books' element={<BookList />} />
          <Route path='/books/:bookId' element={<BookDetails />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/login' element={<Login />} />
          <Route path='*' element={<NotFound />} />
          <Route path="/AuthorsBook" element={<AuthorsBook />} />
          <Route path="/AuthorDetails/:authorId" element={<AuthorDetails />} />
          <Route path='*' element={<NotFound />} />
          
        </Routes>
      </Router>
    </>
  );
}

export default App;
