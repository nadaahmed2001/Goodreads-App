import React from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";

export default function Authors() {
    const handleSaveAuthor = (data) => {
        console.log("Saving Author:", data);
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
                            { name: "firstName", label: "First Name", type: "text" },
                            { name: "lastName", label: "Last Name", type: "text" },
                            { name: "dob", label: "Date of Birth", type: "date" },
                            { name: "photo", label: "Upload Photo", type: "file" }
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
