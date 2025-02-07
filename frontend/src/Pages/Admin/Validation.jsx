import { useState, useEffect } from "react";
import axios from "axios";

const IsLogged = () => {
    const [user, setUser] = useState('');

    useEffect(() => {
        let token = localStorage.getItem("token") || sessionStorage.getItem("token");
        if (token) {
            axios
                .get("http://localhost:5000/profile", {
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
