import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import SignIn from "../components/Authentication/SignIn/SignIn";
import SignUp from "../components/Authentication/SignUp/SignUp";

import Logged from "../components/Authentication/Logged";
import Home from "./Pages/Home/Home";
import Homerahma from "./Pages/Home/Homerahma";
import BookList from "./Pages/Books/BookList";
import BookDetails from "./Pages/Books/BookDetails";
import AdminLogin from "./Pages/Admin/AdminLogin";
import NotFound from "./Pages/NotFound404/NotFound";
import Categories from "./Pages/Admin/Categories";
import ManageBooks from "./Pages/Admin/ManageBooks";
import Authors from "./Pages/Admin/Authors";
import AuthorsBook from "../components/Authors-Book/AuthorsBook";
import AboutUs from "./Pages/AboutUs/AboutUs";
import AuthorDetails from "../components/Authors-Book/AuthorDetails";
import TermsConditions from "./Pages/TermsConditions/TermsConditions";

// import Payment from "./Pages/Payment/Payment";
import UserList from "./Pages/UserBookLists/UserList";
// import { Helmet } from "react-helmet";
import Profile from "./Pages/Profile/Profile";
import { AuthProvider } from "./AuthContext";
import ForgotPassword from "./Pages/PasswordReset/ForgotPassword";
import ResetPassword from "./Pages/PasswordReset/ResetPassword";

import CancelPage from "./Pages/Payment/CancelPage";
import SuccessPage from "./Pages/Payment/SuccessPage";

import CategoriesHome from "./Pages/Categories/CategoriesHome";
import CategoryDetails from "./Pages/Categories/CategoryDetails";
import Searchfun from "../components/Search/Searchfun";
import AuthRedirect from "../components/Authentication/SignIn/AuthRedirect";
import BookPreview from "../components/BookPreview";
import ClickSpark from "./Pages/Profile/ClickSpark";
import SalesChart from "./Pages/Admin/SalesChart";

import LanguageContext from "./context/language";

function App() {
  const [category, setCategory] = useState([]);
  const [author, setAuthor] = useState([]);
  const [fetchTrigger, setFetchTrigger] = useState(false); // Trigger for refetching data

  useEffect(() => {
    fetch("https://goodreads-app-production.up.railway.app/categories")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error("Error fetching categories:", err));
  }, [fetchTrigger]); // Re-fetch when fetchTrigger changes

  // Fetch Authors
  useEffect(() => {
    fetch("https://goodreads-app-production.up.railway.app/authors")
      .then((res) => res.json())
      .then((data) => setAuthor(data))
      .catch((err) => console.error("Error fetching authors:", err));
  }, [fetchTrigger]); // Re-fetch when fetchTrigger changes
  // console.log(category);
  const [language, setLanguage] = useState("en");
  return (
    <>
      <Router>
        {/* <ClickSpark
          sparkColor='#fff'
          sparkSize={12}
          sparkRadius={25}
          sparkCount={10}
          duration={900}
        /> */}

        <LanguageContext.Provider value={{ language, setLanguage }}>
          {/* passing the language and setLanguage to the context */}

          <div
            dir={language === "ar" ? "rtl" : "ltr"}
            className={language === "ar" ? "text-right" : "text-left"}
          >
            <AuthProvider>
              <Routes>
                {/* <Route path='/' element={<Home />} /> */}

                <Route path='/redirect' element={<AuthRedirect />} />
                <Route path='/' element={<Homerahma />} />
                <Route path='/AdminLogin' element={<AdminLogin />} />
                <Route path='/AboutUs' element={<AboutUs />} />
                <Route path='SalesChart' element={<SalesChart />} />
                <Route path='/list/:shelf' element={<UserList />} />
                <Route path='/CancelPage' element={<CancelPage />} />
                <Route path='/SuccessPage' element={<SuccessPage />} />
                <Route path='/BookPreview/:bookId' element={<BookPreview />} />
                {/* <Route path="/Payment" element={<Payment />} /> */}
                <Route
                  path='/Categories'
                  element={
                    <Categories
                      category={category}
                      setFetchTrigger={setFetchTrigger}
                    />
                  }
                />
                <Route
                  path='/ManageBooks'
                  element={<ManageBooks category={category} author={author} />}
                />
                <Route
                  path='/Authors'
                  element={
                    <Authors
                      author={author}
                      setFetchTrigger={setFetchTrigger}
                    />
                  }
                />
                <Route path='/books' element={<BookList />} />
                <Route path='/books/:bookId' element={<BookDetails />} />
                <Route path='/TermsConditions' element={<TermsConditions />} />
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/sign-in' element={<SignIn />} />

                <Route path='/AuthorsBook' element={<AuthorsBook />} />
                <Route
                  path='/AuthorDetails/:authorId'
                  element={<AuthorDetails />}
                />
                <Route path='/profile' element={<Profile />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password' element={<ResetPassword />} />
                <Route path='/categories-home' element={<CategoriesHome />} />
                <Route
                  path='categories-home/:categoryId'
                  element={<CategoryDetails />}
                />
                <Route path='*' element={<NotFound />} />
                <Route path='/search' element={<Searchfun />}></Route>
              </Routes>
            </AuthProvider>
          </div>
        </LanguageContext.Provider>
      </Router>
      {/* <Helmet>
        <link
          href="https://fonts.googleapis.com/css2?family=Spartan:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
      </Helmet> */}
    </>
  );
}

export default App;
