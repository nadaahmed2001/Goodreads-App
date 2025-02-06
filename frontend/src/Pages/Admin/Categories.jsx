import { useState, useEffect } from "react";
import React from 'react'
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import Button from 'react-bootstrap/Button';
import ModalBtn from '../../assets/Reusable';
import Modify from '../Admin/Modify';
import axios from 'axios';
import IsLogged from "../../../components/Authentication/IsLogged";
import DeniedA from "../Profile/DeniedA";
import Denied from "../Profile/Denied";


export default function Categories({ category, setFetchTrigger }) {
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
    const handleSaveCategory = (formData) => {
        axios.post(`http://localhost:5000/category`, { name: formData.name })
            .then((response) => {
                console.log("Category added:", response.data);
                alert("Category added successfully!");
                setFetchTrigger((prev) => !prev)
            })
            .catch((err) => console.log("unable to add category", err));
    }

    // console.log("Categories in category component:", category);
    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`http://localhost:5000/category/${categoryId}`);
            alert("Category deleted successfully!");
            // After deleting, trigger a refetch to update the categories list
            setFetchTrigger((prev) => !prev);
            // setBooks(books.filter(b => b._id !== book._id))
        } catch (err) {
            console.error("Unable to delete category:", err);
        }
    };

    const handleUpdate = async (categoryId, updatedData) => {
        try {
            await axios.put(`http://localhost:5000/category/${categoryId}`, updatedData);
            alert("Category updated successfully!");

            // Refetch the data to reflect changes
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            console.error("Unable to update category:", err);
        }
    };

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
                <Table striped bordered hover className="mt-3">
                    <thead >
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {category.map((c, index) => (
                            <tr key={c._id}>
                                <td>{index + 1}</td>
                                <td>{c.name}</td>
                                <td>
                                    <Modify initialData={{ name: c.name }}
                                        handleUpdate={(data) => handleUpdate(c._id, data)}
                                        fields={[
                                            { name: "name", label: "Category", type: "text" },
                                        ]}
                                    />
                                    <Button variant="outline-dark" onClick={() => handleDelete(c._id)}>❌</Button>

                                </td>
                            </tr>
                        ))
                        }
                    </tbody >
                </Table >
            </div >
        </div >
    )
}
