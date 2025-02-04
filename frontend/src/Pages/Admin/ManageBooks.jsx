import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Table from "react-bootstrap/Table";
import ModalBtn from "../../assets/Reusable";
import Placeholder from "react-bootstrap/Placeholder";
import axios from "axios";

export default function Books({ category, author }) {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get("http://localhost:5000/books");
                setBooks(response.data);
                response.data.forEach((book, index) => {
                    console.log(`Book ${index + 1}:`, book);
                });
            } catch (err) {
                console.error("Unable to fetch books:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBooks();
    }, []);

    useEffect(() => {
        if (books.length > 0) {
            console.log("Books List:", books);
        } else {
            console.log("No books found yet.");
        }
    }, [books]);

    const handleSaveBook = async (formData) => {
        try {
            let imageUrl = "";

            // If an image file is uploaded, upload to Cloudinary
            if (formData.image) {
                const imageData = new FormData();
                imageData.append("file", formData.image);
                imageData.append("upload_preset", "Goodreads-imgs"); // Use unsigned preset
                imageData.append("folder", "book_covers");

                console.log("Uploading image...");

                const uploadRes = await axios.post(
                    "https://api.cloudinary.com/v1_1/dl14s4ipy/image/upload",
                    imageData
                );

                imageUrl = uploadRes.data.secure_url;
                console.log("Image uploaded:", imageUrl);
            }

            // Save book with the uploaded image URL
            const response = await axios.post("http://localhost:5000/book", {
                title: formData.name,
                author: formData.author,
                category: formData.category,
                description: formData.description,
                coverImage: imageUrl, // Save image URL
            });

            console.log("Book added:", response.data);
            alert("Book added successfully!");
            setBooks((prevBooks) => [...prevBooks, response.data]);
        } catch (err) {
            console.error("Unable to add book:", err);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:5000/book/${bookId}`);
            alert("Book deleted successfully!");
            setBooks((prevBooks) => prevBooks.filter(book => book._id !== bookId));
        } catch (err) {
            console.error("Unable to delete book:", err);
        }
    };

    console.log("inside manage books" + category);

    return (
        <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-5">
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
                            { name: "image", label: "Upload Cover Image", type: "file" }, // Add file input
                        ]}
                        onSave={handleSaveBook}
                    />
                </div>

                <Table className="mt-3" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    {isLoading ? (
                        <tbody>
                            {[...Array(3)].map((_, index) => (
                                <tr key={index}>
                                    {[...Array(7)].map((_, i) => (
                                        <td key={i}>
                                            <Placeholder as="p" animation="glow">
                                                <Placeholder xs={12} />
                                            </Placeholder>
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    ) : (
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
                                    <td>{book.author.name}</td>
                                    <td>
                                        <button>✏️</button>
                                        <button onClick={() => handleDelete(book._id)}>❌</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </Table>
            </div>
        </div>
    );
}
