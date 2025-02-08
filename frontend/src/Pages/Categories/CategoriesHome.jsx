import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoriesWithBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from './../Footer/FooterPage';

const CategoriesHome = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategoriesWithBooks();
            console.log("----> Data from fetchCategoriesWithBooks", data);
            setCategories(data);
        };
        getCategories();
    }, []);

    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4 py-6">
                <h1 className="text-3xl font-bold mb-6">Categories</h1>
                {categories.map((category) => (
                    <div key={category._id} className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4">{category.name}</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {category.books.map((book) => (
                                <BookCard book={book} />
                            ))}
                        </div>
                        <Link to={`/categories-home/${category._id}`} className="mt-4 inline-block text-blue-500 font-medium">
                            View All →
                        </Link>
                    </div>
                ))}
            </div>
            <FooterPage />
        </>
    );
};

export default CategoriesHome;