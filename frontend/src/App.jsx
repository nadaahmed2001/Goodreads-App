import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./App.css";
import Books from "./Books";
import Rating from "./Rating";
import Home from './Pages/Home/Home';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import NotFound from './Pages/NotFound404/NotFound';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Admin" element={<AdminDashboard />} />
          <Route path="/Books" element={<Books />} />
          <Route path="/Rating" element={<Rating />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
