import React from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";
import axios from 'axios';


export default function Authors() {
    const handleSaveAuthor = (formData) => {
        axios.post(`http://localhost:5000/author`, {
            name: formData.name,
            // image: formData.image,
            bio: formData.bio,
            birthDate: formData.birthDate
        })
            .then((response) => {
                console.log("Author added:", response.data);
                alert("Author added successfully!");
            })
            .catch((err) => console.log("unable to add author"));
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-between">
                    <h1>Manage Authors</h1>
                    <ModalBtn
                        title="Author"
                        fields={[
                            { name: "name", label: "Fullname", type: "text" },
                            { name: "bio", label: "bio", type: "text" },
                            { name: "birthDate", label: "Date of Birth", type: "date" },
                            // { name: "image", label: "Upload Photo", type: "file" }
                        ]}
                        onSave={handleSaveAuthor}
                    />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr className="bg-light-subtle">
                            <th>ID</th>
                            <th>Photo</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Date of Birth</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>📷</td>
                            <td>Mark</td>
                            <td>Twain</td>
                            <td>1835-11-30</td>
                            <td>✏️ ❌</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
