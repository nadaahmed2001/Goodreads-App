import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";

export default function Books() {
    const [books, setBooks] = useState([]);

    const handleSave = (data) => {
        // Convert file to URL if it's present
        const imageUrl = data.photo ? URL.createObjectURL(data.photo) : null;

        setBooks([...books, { ...data, photo: imageUrl }]);
    };

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-between">
                    <h1>Manage Books</h1>
                    <ModalBtn
                        title="Book"
                        fields={[
                            { name: "name", label: "Book Name", type: "text" },
                            { name: "AuthorId", label: "Author Id", type: "number" },
                            { name: "CategoryId", label: "Category Id", type: "number" },
                            { name: "photo", label: "Upload Photo", type: "file" }
                        ]}
                        onSave={handleSave}
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
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>
                                    {book.photo ? (
                                        <img
                                            src={book.photo}
                                            alt="Book"
                                            width="50"
                                            height="60"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => window.open(book.photo, "_blank")}
                                        />
                                    ) : (
                                        "No Image"
                                    )}
                                </td>
                                <td>{book.name}</td>
                                <td>{book.CategoryId}</td>
                                <td>{book.AuthorId}</td>
                                <td>
                                    <button>✏️</button>
                                    <button onClick={() => setBooks(books.filter(b => b !== book))}>❌</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </Table>
            </div>
        </div>
    );
}
