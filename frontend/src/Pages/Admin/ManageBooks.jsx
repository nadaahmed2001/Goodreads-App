import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";
import axios from 'axios';

export default function Books({ category }) {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/books")
            .then((response) => {
                setBooks(response.data);
            })
            .catch((err) => console.error("Unable to fetch books:", err));
    }, []);

    const handleSaveBook = (formData) => {
        axios
            .post(`http://localhost:5000/temp`, {
                title: formData.name,
                author: formData.authorId, // ObjectId reference to Author
                category: formData.categoryId, // ObjectId reference to Category
            })
            .then((response) => {
                console.log("Book added:", response.data);
                alert("Book added successfully!");
                setBooks((prevBooks) => [...prevBooks, response.data]); // Update the list of books
            })
            .catch((err) => console.error("Unable to add book:", err));
    };
    console.log(books);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-between">
                    <h1>Manage Books</h1>
                    <ModalBtn
                        title="Book"
                        category={category}
                        fields={[
                            { name: "name", label: "Book Name", type: "text" },
                            { name: "author", label: "Choose Author", type: "dropdown" },
                            { name: "category", label: "Choose Category", type: "dropdown" }
                        ]}
                        onSave={handleSaveBook}
                    />
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Category Id</th>
                            <th>Author Id</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book._id}>
                                <td>{index + 1}</td>
                                <td>
                                    {book.coverImage ? (
                                        <img
                                            src={book.coverImage}
                                            alt="Book"
                                            width="50"
                                            height="60"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => window.open(book.coverImage, "_blank")}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{book.name}</td>
                                <td>{book.categoryId}</td>
                                <td>{book.authorId}</td>
                                <td>
                                    <button>✏️</button>
                                    <button onClick={() => setBooks(books.filter(b => b._id !== book._id))}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}
