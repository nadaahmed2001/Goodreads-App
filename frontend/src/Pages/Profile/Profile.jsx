import React, { useEffect, useState } from "react";
import axios from "axios";

import IsLogged from "../../../components/Authentication/IsLogged";
import SplashCursor from "./SplashCursor";
import Denied from "./Denied"
import "./Profile.css";

const Profile = () => {

  const [user, setUser] = useState(null);
  const isUserLogged = IsLogged();
  useEffect(() => {
    if (isUserLogged) {
      let token = localStorage.getItem("token") || sessionStorage.getItem("token");
      axios
        .get("http://localhost:5000/profile", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((result) => {
          setUser(result.data);
        })
        .catch((error) => console.log(error));
    }
  }, [isUserLogged]);

  if (!isUserLogged) {
    return (
      <Denied />
    );
  }
  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    <div className="profile-container">
        <SplashCursor />
   

      <div className="profile-card">
        
        <h2>Welcome, {user.first_name} {user.last_name}!</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Member Since:</strong> {new Date(user.created_at).toDateString()}</p>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem("token");
          sessionStorage.removeItem("token");
          window.location.href = "/sign-in";
        }}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
