import React from 'react';
import { Link } from "react-router-dom";

export default function DeniedA() {
  return (
    <div className="not-logged-container">
      <div className="not-logged-card">
        <h2>Access Denied</h2>
        <p>You are not an admin.</p>
        <Link to="/" className="home-btn">Go to Home</Link>
      </div>
    </div>
  );
}
