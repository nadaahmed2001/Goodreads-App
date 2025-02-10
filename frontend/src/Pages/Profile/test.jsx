
import React, { useEffect, useState } from "react";
import axios from "axios";
import IsLogged from "../../../components/Authentication/IsLogged";
import Denied from "../../../components/Authentication/Denied";

const Profile = () => {
  
  const [user, setUser] = useState(null);
  const isUserLogged = IsLogged();

  useEffect(() => {
    if (isUserLogged) {
      let token = localStorage.getItem("token") || sessionStorage.getItem("token");
      axios
        .get("https://goodreads-app-production.up.railway.app/profile", {
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
        
    </div>
  );
};

export default Profile;
