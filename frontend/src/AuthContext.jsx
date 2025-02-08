import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [subscription, setSubscription] = useState('');
  const [loading, setLoading] = useState(true);
  const [authors, setAuthors] = useState([]);  // Manage authors' state
  const [authorsLoading, setAuthorsLoading] = useState(true);  // Authors loading state
  const [authorsError, setAuthorsError] = useState(null);  // Authors error state
  const navigate = useNavigate();

  // Fetch user from token on mount
  useEffect(() => {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setUser(result.data);
          setRole(result.data.role);
          setSubscription(result.data.subscription)
        })
        .catch()
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch authors' data on mount
  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await fetch("http://localhost:5000/authors");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAuthors(data);
      } catch (error) {
        setAuthorsError(error.message);
      } finally {
        setAuthorsLoading(false);
      }
    };

    fetchAuthors();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    setUser(null);
    setRole(null);
    navigate("/sign-in"); // Redirect to the sign-in page
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        subscription,
        loading,
        authors,
        authorsLoading,
        authorsError,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
