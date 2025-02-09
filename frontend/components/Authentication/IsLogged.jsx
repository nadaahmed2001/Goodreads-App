import { useState, useEffect } from "react";
import axios from "axios";

const IsLogged = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let token = localStorage.getItem("token") || sessionStorage.getItem("token");
    if (token) {
      axios
        .get("https://goodreads-app-production.up.railway.app/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setUser(result.data);
        })
        .catch(() => setUser(null));
    }
  }, []);

  return user !== null;
};

export default IsLogged;
