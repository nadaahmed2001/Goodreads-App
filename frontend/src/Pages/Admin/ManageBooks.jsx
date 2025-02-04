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
                // setIsLoading(true);
                // await new Promise((resolve) => setTimeout(resolve, 3000));
                setIsLoading(true);
                const response = await axios.get("http://localhost:5000/books");
                setBooks(response.data);
            } catch (err) {
                console.error("Unable to fetch books:", err);
            } finally {
                setIsLoading(false); // Ensures loading stops even if an error occurs
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
            const response = await axios.post("http://localhost:5000/book", {
                title: formData.name,
                author: formData.author,
                category: formData.category,
                description: formData.description,
            });

            console.log("Book added:", response.data);
            alert("Book added successfully!");
            setBooks((prevBooks) => [...prevBooks, response.data]); // Update the list of books
        } catch (err) {
            console.error("Unable to add book:", err);
        }
    };

    const handleDelete = async (bookId) => {
        try {
            await axios.delete(`http://localhost:5000/book/${bookId}`);
            alert("Book deleted successfully!");
            // After deleting, trigger a refetch to update the categories list
            setBooks((prevBooks) => prevBooks.filter(book => book._id !== bookId)); // Remove deleted book from state
            // setFetchTrigger((prev) => !prev);
            // setBooks(books.filter(b => b._id !== book._id))
        } catch (err) {
            console.error("Unable to delete category:", err);
        }
    };
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
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
                                    <td>
                                        <Placeholder as="p" animation="glow">
                                            <Placeholder xs={12} />
                                        </Placeholder>
                                    </td>
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
                                                alt="Alt Book"
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
                                    <td>
                                        {category?.find(cat => cat._id === book?.category)?.name || '-'}
                                    </td>
                                    <td>
                                        {author?.find(auth => auth._id === book?.author)?.name || '-'}
                                    </td>

                                    <td>
                                        <button>✏️</button>
                                        <button
                                            onClick={() => handleDelete(book._id)}>
                                            ❌
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </Table>
            </div>
        </div >
    );
}
