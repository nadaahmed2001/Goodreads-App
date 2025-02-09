// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import * as pdfjs from "pdfjs-dist";
// import "pdfjs-dist/build/pdf.worker.entry";
// import HTMLFlipBook from "react-pageflip";
// import "./BookPreview.css";

// const BookPreview = () => {
//     const { bookId } = useParams();
//     const [pdfUrl, setPdfUrl] = useState(null);
//     const [pages, setPages] = useState([]);

//     useEffect(() => {
//         const getBook = async () => {
//             try {
//                 const response = await axios.get(`https://goodreads-app-production.up.railway.app/BookPreview/${bookId}`);
//                 console.log("Fetched book:", response.data);
//                 setPdfUrl(response.data.fullBook); // ✅ Store PDF URL directly
//             } catch (error) {
//                 console.error("Error fetching book details:", error.response || error);
//             }
//         };

//         getBook();
//     }, [bookId]); // ✅ Prevent infinite loop

//     useEffect(() => {
//         if (!pdfUrl) return; // ✅ Ensure we have a PDF URL before fetching text

//         const loadPdf = async () => {
//             try {
//                 const loadingTask = pdfjs.getDocument(pdfUrl);
//                 const pdf = await loadingTask.promise;
//                 const textPages = [];

//                 for (let i = 1; i <= pdf.numPages; i++) {
//                     const page = await pdf.getPage(i);
//                     const textContent = await page.getTextContent();
//                     const text = textContent.items.map((item) => item.str).join(" ");
//                     textPages.push(text);
//                 }

//                 setPages(textPages);
//             } catch (error) {
//                 console.error("Error loading PDF:", error);
//             }
//         };

//         loadPdf();
//     }, [pdfUrl]); // ✅ Runs only when `pdfUrl` is available

//     return (
//         <div className="book-container">
//             {pdfUrl ? (
//                 <HTMLFlipBook width={750} height={900}>
//                     {pages.map((text, index) => (
//                         <div className="page" key={index}>
//                             <h6>Page {index + 1}</h6>
//                             <p>{text}</p>
//                         </div>
//                     ))}
//                 </HTMLFlipBook>
//             ) : (
//                 <p>Loading book...</p>
//             )}
//         </div>
//     );
// };

// export default BookPreview;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";
import HTMLFlipBook from "react-pageflip";
import "./BookPreview.css";

const BookPreview = () => {
    const { bookId } = useParams();
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false)
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const getBook = async () => {
            try {

                const response = await axios.get(`https://goodreads-app-production.up.railway.app/BookPreview/${bookId}`);
                console.log("Fetched book:", response.data);
                setPdfUrl(response.data.fullBook);
            } catch (error) {
                console.error("Error fetching book details:", error.response || error);
            }
        };

        getBook();
    }, [bookId]);

    useEffect(() => {
        if (!pdfUrl) return;

        const loadPdf = async () => {
            try {
                setLoading(true)
                const loadingTask = pdfjs.getDocument(pdfUrl);
                const pdf = await loadingTask.promise;
                setLoading(false)
                let fullText = "";

                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    const text = textContent.items.map((item) => item.str).join(" ");
                    fullText += text + " "; // Append all pages' text
                }

                // Split text into pages of 380 words each
                const words = fullText.split(/\s+/);
                const textPages = [];

                for (let i = 0; i < words.length; i += 380) {
                    textPages.push(words.slice(i, i + 380).join(" "));
                }

                setPages(textPages);
            } catch (error) {
                console.error("Error loading PDF:", error);
            }
        };

        loadPdf();
    }, [pdfUrl]);

    return (
        <div className="book-container">
            {!loading ? (
                <HTMLFlipBook width={750} height={900}>
                    {pages.map((text, index) => (
                        <div className="page" key={index}>
                            <div className="page-content">
                                <p>{text}</p>
                            </div>
                            <h6>Page {index + 1}</h6>
                        </div>
                    ))}
                </HTMLFlipBook>
            ) : (

                <div className="loader-container">
                    <div className="spinner"></div>
                    <p className="text-light">Loading your book, please wait...</p>
                </div>

            )}
        </div>
    );
};

export default BookPreview;
