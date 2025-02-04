import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";
import Register from "../components/Authentication/SignUp/Register";
import Logged from "../components/Authentication/Logged";
import Home from "./Pages/Home/Home";
import BookList from "./Pages/Books/BookList";
import BookDetails from "./Pages/Books/BookDetails";
import AdminLogin from "./Pages/Admin/AdminLogin";
import NotFound from "./Pages/NotFound404/NotFound";
import Categories from "./Pages/Admin/Categories";
import ManageBooks from "./Pages/Admin/ManageBooks";
import Authors from "./Pages/Admin/Authors";
import AuthorsBook from "../components/Authors-Book/AuthorsBook";
import AuthorDetails from "../components/Authors-Book/AuthorDetails";
import Login from "../components/Authentication/SignIn/Login";
import UserList from "./Pages/UserBookLists/UserList";
import { useState, useEffect } from "react";

function App() {
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false); // Trigger for refetching data

  // Fetch Categories
  useEffect(() => {
    fetch("http://localhost:5000/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [fetchTrigger]); // Re-fetch when fetchTrigger changes

  // Fetch Authors
  useEffect(() => {
    fetch("http://localhost:5000/authors")
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch((err) => console.error("Error fetching authors:", err));
  }, [fetchTrigger]); // Re-fetch when fetchTrigger changes

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/AdminLogin' element={<AdminLogin />} />
          <Route path='/Register' element={<Register />} />
          <Route
            path='/Categories'
            element={<Categories category={category} />}
          />
          <Route
            path='/ManageBooks'
            element={<ManageBooks category={category} />}
          />

<Route path="/list/:shelf" element={<UserList />} />


          <Route path='/Authors' element={<Authors />} />
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
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/AdminLogin' element={<AdminLogin />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Categories' element={<Categories category={category} setFetchTrigger={setFetchTrigger} />} />
        <Route path='/ManageBooks' element={<ManageBooks category={category} author={author} />} />
        <Route path='/Authors' element={<Authors author={author} setFetchTrigger={setFetchTrigger} />} />
        <Route path='/books' element={<BookList />} />
        <Route path='/books/:bookId' element={<BookDetails />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/login' element={<Login />} />
        <Route path='/AuthorsBook' element={<AuthorsBook />} />
        <Route path='/AuthorDetails/:authorId' element={<AuthorDetails />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
