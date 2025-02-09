import { useContext } from "react";
import React from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ModalBtn from "../../assets/Reusable";
import Modify from "../Admin/Modify";
import axios from "axios";
import { AuthContext } from "../../../src/AuthContext"; // Use AuthContext
import DeniedA from "../Profile/DeniedA";
import Denied from "../Profile/Denied";
import ShinyText from "../../services/Style/ShinyText";
import XButton from './XBtn';

export default function Categories({ category, setFetchTrigger }) {
    const { user, role } = useContext(AuthContext); // Get user and role from context

    if (!user) {
        return <Denied />; // Show access denied if no user is logged in
    }

    if (role !== "admin") {
        return <DeniedA />; // Show a different access denied message for non-admin users
    }

    const handleSaveCategory = (formData) => {
        axios
            .post("https://goodreads-app-production.up.railway.app/category", { name: formData.name })
            .then((response) => {
                alert("Category added successfully!");
                setFetchTrigger((prev) => !prev);
            })
            .catch((err) => console.log("Unable to add category", err));
    };

    const handleDelete = async (categoryId) => {
        try {
            await axios.delete(`https://goodreads-app-production.up.railway.app/category/${categoryId}`);
            alert("Category deleted successfully!");
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            console.error("Unable to delete category:", err);
        }
    };

    const handleUpdate = async (categoryId, updatedData) => {
        try {
            await axios.put(`https://goodreads-app-production.up.railway.app/category/${categoryId}`, updatedData);
            alert("Category updated successfully!");
            setFetchTrigger((prev) => !prev);
        } catch (err) {
            console.error("Unable to update category:", err);
        }
    };

    return (
        <div className="d-flex">

            <Sidebar />

            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-between">
                    <h1>Manage Categories</h1>

                    <ModalBtn
                        title="Category"
                        category={category}
                        fields={[{ name: "name", label: "Category", type: "text" }]}
                        onSave={handleSaveCategory}
                    />
                </div>
                <Table striped bordered hover className="mt-3">

                    <thead>

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
                                    <Modify
                                        initialData={{ name: c.name }}
                                        handleUpdate={(data) => handleUpdate(c._id, data)}
                                        fields={[{ name: "name", label: "Category", type: "text" }]}
                                    />
                                    <button variant="outline-dark" onClick={() => handleDelete(c._id)}>
                                        <XButton />
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
