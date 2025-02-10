import React, { useState, useEffect, useContext } from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";
import Placeholder from "react-bootstrap/Placeholder";
import Modify from './Modify'
import axios from "axios";
import Denied from "../Profile/Denied";
import Button from 'react-bootstrap/Button';
import DeniedA from "../Profile/DeniedA";
import IsLogged from "../../../components/Authentication/IsLogged";
import { AuthContext } from "../../../src/AuthContext"; // Use AuthContext
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { Spinner } from "react-bootstrap";

import "./Books.css"
import SplitText from "../../../components/SplitText";
import XButton from './XBtn';


export default function Books({ category, author }) {
    const { user, role } = useContext(AuthContext); // Get user and role from context

    if (!user) {
        return <Denied />; // Show access denied if no user is logged in
    }

    if (role !== "admin") {
        return <DeniedA />; // Show a different access denied message for non-admin users
    }
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("https://goodreads-app-production.up.railway.app/books");
                setBooks(response.data);
                response.data.forEach((book, index) => {
                    // console.log(`Book ${index + 1}:`, book);
                });
            } catch (err) {
                console.error("Unable to fetch books:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);



    const handleSaveBook = async (formData) => {
        try {
            let pdfUrl = "";
            let imageUrl = "";

            // Upload PDF if provided
            if (formData.fullBook) {
                const pdfData = new FormData();
                pdfData.append("file", formData.fullBook);
                pdfData.append("upload_preset", "Goodreads-pdfs");
                pdfData.append("folder", "book_pdfs");
                setIsLoading(true)
                const pdfUploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/Mano22/upload",
                    pdfData
                );

                pdfUrl = pdfUploadRes.data.secure_url;
            }

            // Upload image if provided
            if (formData.image) {
                const imageData = new FormData();
                imageData.append("file", formData.image);
                imageData.append("upload_preset", "Goodreads-imgs");
                imageData.append("folder", "book_covers");

                const imageUploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/mano22/image/upload",
                    imageData
                );

                imageUrl = imageUploadRes.data.secure_url;
            }

            // Save book to database
            await axios.post("https://goodreads-app-production.up.railway.app/book", {
                coverImage: imageUrl,
                title: formData.name,
                description: formData.description,
                category: formData.category,
                author: formData.author,
                demo: formData.demo,
                fullBook: pdfUrl,
            });
            alert("Book added successfully!");
            setIsLoading(false)

            // Re-fetch all books
            const response = await axios.get("https://goodreads-app-production.up.railway.app/books");
            setBooks(response.data);

        } catch (err) {
            console.error("Unable to add book:", err);
        }
    };


    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`https://goodreads-app-production.up.railway.app/book/${bookId}`);
            alert("Book deleted successfully!");
            setBooks((prevBooks) => prevBooks.filter(book => book._id !== bookId));
        } catch (err) {
            console.error("Unable to delete book:", err);
        }
    };

    const handleUpdate = async (bookId, updatedData) => {
        try {
            await axios.put(`https://goodreads-app-production.up.railway.app/book/${bookId}`, updatedData);
            alert("Book updated successfully!");

            const response = await axios.get("https://goodreads-app-production.up.railway.app/books");
            setBooks(response.data);
        } catch (err) {
            console.error("Unable to update book:", err);
        }
    }

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5 d-flex flex-column">
                {isLoading ? (
                    <div className="d-flex flex-column justify-content-center align-items-center my-auto">
                        <Spinner animation="border" role="status" style={{ width: "4rem", height: "4rem" }} />
                        <p className="mt-3">Loading...</p>
                    </div>
                ) : (
                    <>
                        <div className="d-flex justify-content-between">
                            <h1>Manage Books</h1>
                            <ModalBtn
                                title="Book"
                                category={category}
                                author={author}
                                book={books}
                                fields={[
                                    { name: "name", label: "Book Name", type: "text" },
                                    { name: "description", label: "Book Description", type: "text" },
                                    { name: "category", label: "Choose Category", type: "dropdown" },
                                    { name: "author", label: "Choose Author", type: "dropdown" },
                                    { name: "demo", label: "Demo", type: "text" },
                                    { name: "fullBook", label: "Upload PDF", type: "file" },
                                    { name: "image", label: "Upload Cover Image", type: "file" },
                                ]}
                                onSave={handleSaveBook}
                            />
                        </div>

                        <Table className="mt-3" style={{ border: '1px solid black' }} striped bordered hover>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Photo</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Category</th>
                                    <th>Author</th>
                                    <th>Demo</th>
                                    <th>Full Book</th>
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
                                                    alt={book}
                                                    width="50"
                                                    height="60"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => window.open(book.coverImage, "_blank")}
                                                />
                                            ) : (
                                                "No Image"
                                            )}
                                        </td>
                                        <td>{book.title}</td>
                                        <td>{book.description}</td>
                                        <td>{category?.find(cat => cat._id === book?.category)?.name || '-'}</td>
                                        <td>{author?.find(a => a._id === book?.author)?.name || book?.author?.name || '-'}</td>
                                        <td>
                                            <div style={{ maxHeight: '120px', overflowY: 'auto' }}>
                                                {book.demo}
                                            </div>
                                        </td>
                                        <td>
                                            {book.fullBook ? (
                                                <a href={book.fullBook} target="_blank" download={book.title || "book.pdf"}>
                                                    View PDF
                                                </a>
                                            ) : (
                                                <span>No PDF available</span>
                                            )}
                                        </td>
                                        <td>
                                            <Modify
                                                title="Book"
                                                category={category}
                                                author={author}
                                                handleUpdate={(data) => handleUpdate(book._id, data)}
                                                fields={[
                                                    { name: "title", label: "name", type: "text" },
                                                    { name: "description", label: "Description", type: "text" },
                                                    { name: "category", label: "Category", type: "dropdown" },
                                                    { name: "author", label: "Author", type: "dropdown" },
                                                ]}
                                            />
                                            <button onClick={() => handleDelete(book._id)}><XButton /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </>
                )}
            </div>
        </div>
    );

}