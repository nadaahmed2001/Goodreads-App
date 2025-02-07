import React, { useContext } from "react";

import Navbar from "../../../components/navbar";
import SplashCursor from "./SplashCursor";
import Denied from "./Denied";
import "./Profile.css";
import { AuthContext } from "../../AuthContext";
const Profile = () => {
  const { user, loading, logout } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  if (!user) return <Denied />;

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <SplashCursor />
        <div className="profile-card">
          <h2>Welcome, {user.first_name} {user.last_name}!</h2>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Member Since:</strong> {new Date(user.created_at).toDateString()}</p>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </div>
    </>
  );
};

export default Profile;
