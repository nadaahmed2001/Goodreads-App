import { useState, useEffect } from "react";
import React from 'react'
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ModalBtn from '../../assets/Reusable';
import axios from 'axios';


export default function Categories({ category }) {

    const handleSaveCategory = (formData) => {
        axios.post(`http://localhost:5000/category`, { name: formData.name })
            .then((response) => {
                console.log("Category added:", response.data);
                alert("Category added successfully!");
                setCategory((prev) => [...prev, response.data]); // ✅ Update state to refresh UI
            })
            .catch((err) => console.log("unable to add category"));
    }

    // console.log("Categories in category component:", category);

    return (
        <div className='d-flex'>
            <Sidebar />
            <div className="flex-grow-1 p-5 ">
                <div className='d-flex justify-content-between'>
                    <h1>Manage Categories</h1>
                    {/* <Button variant="dark">Add Category</Button> */}
                    <ModalBtn
                        title="Category"
                        category={category}
                        fields={[
                            { name: "name", label: "Category", type: "text" },
                        ]}
                        onSave={handleSaveCategory}
                    />
                </div>
                <Table striped bordered hover>
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Admin</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Moderator</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </div>
    )
}
