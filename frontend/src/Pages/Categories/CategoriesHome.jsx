// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { fetchCategoriesWithBooks } from "../../services/api";
// import BookCard from "../../../components/BookCard";
// import Navbar from "../../../components/navbar";
// import FooterPage from './../Footer/FooterPage';
// import { Button } from "react-bootstrap";
// import './Category.css'
// const CategoriesHome = () => {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//         const getCategories = async () => {
//             const data = await fetchCategoriesWithBooks();
//             setCategories(data);
//         };
//         getCategories();
//     }, []);

//     return (
//         <>
//             <Navbar />
//             <div className="container">
//                 {/* Page Title */}
//                 <h1 className="category-title" > Categories </h1>

//                 {/* Categories Grid */}
//                 <div className="row">
//                     {categories.map((category) => (
//                         <div key={category._id} className="col-md-6 mb-12">
//                             {/* Category Title */}
//                             <h2
//                                 className="category-name"
//                             >
//                                 <hr></hr>
//                                 {category.name}
//                             </h2>
// <hr></hr>
//                             {/* Books Grid */}
//                             <div className="row">
//                                 {category.books.map((book) => (
//                                     <div key={book._id} className="col-md-4 mb-4">
//                                         <BookCard book={book} />
//                                     </div>
//                                 ))}
//                             </div>

//                             {/* View All Button */}
//                             <Link to={`/categories-home/${category._id}`} className="mt-4 d-inline-block">
//                                 <Button variant="outline-secondary" className="viewAllbtn">
//                                     View All →
//                                 </Button>
//                             </Link>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <FooterPage />
//         </>
//     );
// };

// export default CategoriesHome;




import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchCategoriesWithBooks } from "../../services/api";
import BookCard from "../../../components/BookCard";
import Navbar from "../../../components/navbar";
import FooterPage from '../Footer/FooterPage';
import { Container, Card, Accordion, Button } from "react-bootstrap";

const CategoriesHome = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const getCategories = async () => {
            const data = await fetchCategoriesWithBooks();
            setCategories(data);
        };
        getCategories();
    }, []);

    return (
        <>
            <Navbar />
            <Container className="my-5 py-4" style={{ maxWidth: "960px" }}>
                <Card className="border-0 bg-transparent">
                    <Card.Header className="m-auto text-light mb-0 bg-transparent border-0">
                        <div className="d-flex align-items-center justify-center gap-3">
                            <h1 className="mb-0 display-5 c-main">Categories</h1>
                        </div>
                    </Card.Header>

                    <Card.Body className="p-4">
                        <Accordion defaultActiveKey="0" flush>
                            {categories.map((category, index) => (
                                <Accordion.Item eventKey={String(index)} key={category._id}>
                                    <Accordion.Header className="accordion-header-custom">
                                        <h3 className="mb-0 fs-4">{category.name}</h3>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="row">
                                            {category.books.map((book) => (
                                                <div key={book._id} className="col-md-4 mb-4">
                                                    <BookCard book={book} />
                                                </div>
                                            ))}
                                        </div>
                                        <Link to={`/categories-home/${category._id}`} className="mt-4 d-inline-block">
                                            <Button variant="outline-custom" className="viewAllBtn">
                                                View All →
                                            </Button>
                                        </Link>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    </Card.Body>
                </Card>
            </Container>
            <FooterPage />

            <style>
                {`
                    .accordion-header-custom button:not(.collapsed) {
                        background-color: #59461B !important;
                        color: white !important;
                    }

                    .accordion-header-custom button {
                        transition: background-color 0.3s ease, color 0.3s ease;
                    }

                    .viewAllBtn {
                        color: #59461B;
                        border-color: #59461B;
                    }

                    .viewAllBtn:hover {
                        background-color: #59461B;
                        color: white;
                    }
                `}
            </style>
        </>
    );
};

export default CategoriesHome;