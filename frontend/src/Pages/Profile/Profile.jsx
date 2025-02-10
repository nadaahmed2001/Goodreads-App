import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../AuthContext";
import Navbar from "../../../components/navbar";

const Profile = () => {
  const { user, setUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    country: "",
    mobile: "",
    profileImage: "",
  });

  
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        country: user.country || "",
        profileImage: user.profileImage || "",
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ color: "#555", textAlign: "center", fontSize: "24px", fontFamily: "'Poppins', sans-serif" }}>
        Loading...
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    setIsUploading(true);

    try {
      const imageData = new FormData();
      imageData.append("file", file);
      imageData.append("upload_preset", "Goodreads-imgs");

      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/mano22/image/upload",
        imageData
      );

      setFormData((prev) => ({ ...prev, profileImage: uploadRes.data.secure_url }));
      setMessage("Image uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      setMessage("Image upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      setMessage("Please wait until the image upload completes.");
      return;
    }

    const isSameData = Object.keys(formData).every(
      (key) => formData[key] === user[key]
    );

    if (isSameData && !imageFile) {
      setMessage("No changes detected.");
      return;
    }

    try {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token");

      const response = await axios.put("https://goodreads-app-production.up.railway.app/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200 || response.status === 201) {
        setUser(response.data);
        setMessage("Profile updated successfully!");
      } else {
        setMessage(`Unexpected response: ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response) {
        setMessage(error.response.data.message || "An error occurred.");
      } else {
        setMessage("Server is unreachable. Please try again later.");
      }
    }
  };

  return (
   
    <>
<div style={{ background: "linear-gradient(135deg,rgba(183, 167, 110, 0.78),rgb(189, 180, 153))", minHeight: "100vh" }}>
<Navbar /> 

    <div
      style={{
        background: "linear-gradient(135deg, #E8E0C6, #D4C9A8)",
        color: "#555",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px",
        borderRadius: "20px",
        border: "1px solid rgba(255, 255, 255, 0.3)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        margin: "50px auto",
        maxWidth: "1200px",
       
      }}
    >
      <div style={{ display: "flex", flexDirection: "row", gap: "40px" }}>
        {/* Left Column - Profile Image */}
        <div
          style={{
            flex: 1,
            borderRight: "1px solid rgba(255, 255, 255, 0.3)",
            padding: "20px",  
            textAlign: "center",
          }}
        >
          <img
            style={{
              width: "150px",
              height: "150px",
              borderRadius: "50%",
              border: "5px solid rgba(255, 255, 255, 0.3)",
              transition: "transform 0.3s ease, border-color 0.3s ease",
            }}
            src={
              formData.profileImage ||
              "https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            }
            alt="Profile"
            onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
          />
          <h5 style={{ color: "#555", fontSize: "1.5rem", marginTop: "15px" }}>
            {user?.first_name || "Loading..."} {user?.last_name || ""}
          </h5>
          <span style={{ color: "#777" }}>{user.email}</span>

          {/* File Input for Image Upload */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
            id="fileInput"
          />
          <label
            htmlFor="fileInput"
            style={{
              display: "inline-block",
              padding: "10px 20px",
              background: "rgba(255, 255, 255, 0.3)",
              color: "#555",
              borderRadius: "25px",
              cursor: "pointer",
              marginTop: "20px",
              transition: "background 0.3s ease, transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.5)";
              e.target.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "rgba(255, 255, 255, 0.3)";
              e.target.style.transform = "scale(1)";
            }}
          >
            Upload Image
          </label>

          {/* Uploading Indicator */}
          {isUploading && (
            <p style={{ color: "#555", marginTop: "10px" }}>Uploading image...</p>
          )}
        </div>

        {/* Right Column - Profile Form */}
        <div style={{ flex: 2, padding: "20px" }}>
          <h4 style={{ textAlign: "right", color: "#555", marginBottom: "20px" }}>
            Profile Settings
          </h4>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#555" }}>First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "#555",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C4B89C")} // Darker shade of #E8E0C6
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ color: "#555" }}>Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    background: "rgba(255, 255, 255, 0.3)",
                    color: "#555",
                    transition: "border-color 0.3s ease",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C4B89C")} // Darker shade of #E8E0C6
                  onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "#555" }}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#555",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C4B89C")} // Darker shade of #E8E0C6
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "#555" }}>Mobile</label>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#555",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C4B89C")} // Darker shade of #E8E0C6
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")}
              />
            </div>

            <div style={{ marginTop: "20px" }}>
              <label style={{ color: "#555" }}>Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "rgba(255, 255, 255, 0.3)",
                  color: "#555",
                  transition: "border-color 0.3s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C4B89C")} // Darker shade of #E8E0C6
                onBlur={(e) => (e.target.style.borderColor = "rgba(255, 255, 255, 0.3)")}
              />
            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button
                type="submit"
                disabled={isUploading}
                style={{
                  padding: "10px 30px",
                  background: isUploading ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 0.3)",
                  color: "#555",
                  borderRadius: "25px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "16px",
                  transition: "background 0.3s ease, transform 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isUploading) {
                    e.target.style.background = "rgba(255, 255, 255, 0.5)";
                    e.target.style.transform = "scale(1.05)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isUploading) {
                    e.target.style.background = "rgba(255, 255, 255, 0.3)";
                    e.target.style.transform = "scale(1)";
                  }
                }}
              >
                {isUploading ? "Uploading..." : "Save Profile"}
              </button>
            </div>
          </form>

          {message && (
            <p style={{ textAlign: "center", marginTop: "20px", color: "#555" }}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
    </div>
    </>
   
  );
};

export default Profile;