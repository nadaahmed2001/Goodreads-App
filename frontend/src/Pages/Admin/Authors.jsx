import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";
import axios from "axios";
import Modify from "./Modify"
import Denied from "../Profile/Denied";
import DeniedA from "../Profile/DeniedA";
import IsLogged from "../../../components/Authentication/IsLogged";

export default function Authors({ author, setFetchTrigger }) {

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

    if (!isUserLogged || !user) {
        return <Denied />;
    }

    if (user.role !== "admin") {
        return <>
        
        <DeniedA />
        </>;
    }

    
    const handleSaveAuthor = (formData) => {
        const imageFile = formData.image;

        if (!imageFile) {
            alert("Please select an image.");
            return;
        }

        const imageData = new FormData();
        imageData.append("file", imageFile);
        imageData.append("upload_preset", "Goodreads-imgs");
        console.log("Uploading file:", imageFile);
        axios.post("https://api.cloudinary.com/v1_1/dl14s4ipy/image/upload", imageData)
            .then(uploadRes => {
                const imageUrl = uploadRes.data.secure_url;
                return axios.post(`http://localhost:5000/author`, {
                    name: formData.name,
                    bio: formData.bio,
                    birthDate: formData.birthDate,
                    image: imageUrl // Save the uploaded image URL in DB
                });
            })
            .then(() => {
                alert("Author added successfully!");
                setFetchTrigger(prev => !prev);
            })
            .catch(err => console.log("Unable to add author", err.response?.data || err.message));
    };

    const handleDelete = async (authorId) => {
        try {
            await axios.delete(`http://localhost:5000/authorsAdmin/${authorId}`);
            alert("author deleted successfully!");
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            console.error("Unable to delete author:", err);
        }
    };
    const handleUpdate = async (authorId, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/authorsAdmin/${authorId}`, updatedData);
            alert("Author updated successfully!");
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            console.error("Unable to update author:", err);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-between">
                    <h1>Manage Authors</h1>
                    <ModalBtn
                        title="Author"
                        author={author}
                        fields={[
                            { name: "name", label: "Fullname", type: "text" },
                            { name: "bio", label: "bio", type: "text" },
                            { name: "birthDate", label: "Date of Birth", type: "date" },
                            { name: "image", label: "Upload Photo", type: "file", accept: "image/*" }
                        ]}
                        onSave={handleSaveAuthor}
                    />
                </div>
                <Table striped bordered hover className="mt-3">
                    <thead>
                        <tr className="bg-light-subtle">
                            <th>ID</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Bio</th>
                            <th>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {author.map((a, idx) => (
                            <tr key={a._id}>
                                <td>{idx + 1}</td>
                                <td>
                                    {a.image ? (
                                        <img
                                            src={a.image}
                                            alt="Alt Book"
                                            width="50"
                                            height="60"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => window.open(a.image, "_blank")}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>

                                <td>{a.name}</td>
                                <td>{a.bio}</td>
                                <td>{a.birthDate}</td>
                                <td>
                                    <Modify
                                        initialData={{
                                            name: a.name,
                                            bio: a.bio,
                                            birthDate: a.birthDate,
                                            // image: a.imageUrl
                                        }}
                                        handleUpdate={(data) => handleUpdate(a._id, data)}
                                        fields={[
                                            { name: "name", label: "Fullname", type: "text" },
                                            { name: "bio", label: "bio", type: "text" },
                                            { name: "birthDate", label: "Date of Birth", type: "date" },
                                            // { name: "image", label: "Upload Photo", type: "file" }
                                        ]}
                                    />

                                    <button
                                        onClick={() => handleDelete(a._id)}>
                                        ❌

                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
