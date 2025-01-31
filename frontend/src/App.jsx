import { BrowserRouter, Route, Routes } from "react-router";
import SignIn from '../components/Authentication/SignIn/SignIn'
import SignUp from "../components/Authentication/SignUp/SignUp";
import './App.css'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-up" element={<SignUp/>} />
        <Route path="/sign-in" element={<SignIn/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App