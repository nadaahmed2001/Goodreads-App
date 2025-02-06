import React from 'react'
import { Link } from "react-router-dom";
export default function Denied() {
  return (
    
      <div className="not-logged-container">
        <div className="not-logged-card">
          <h2>Access Denied</h2>
          <p>You must be logged in to view this page.</p>
          <Link to="/sign-in" className="login-btn">Go to Sign In</Link>
        </div>
      </div>
    
  )
}
