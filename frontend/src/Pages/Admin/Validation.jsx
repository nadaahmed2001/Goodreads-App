import { useState, useEffect } from "react";
import axios from "axios";

const IsLogged = () => {
    const [user, setUser] = useState('');

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
                .catch(() => setUser(''));
        }
    }, []);
    console.log(user);

    return user;
};

export default IsLogged;
