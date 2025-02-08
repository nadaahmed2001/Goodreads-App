
import React, { useEffect } from "react";
import Navbar from "../navbar";

export default function Searchfun() {
  return (
    <>
  
      <div>
   
        <h2>Books</h2>
        {/* <ul>
          {setBooks.length === 0 ? (
            <p>No books found.</p>
          ) : (
            books.map((book) => <li key={book._id}>{book.title}</li>)
          )}
        </ul> */}
      </div>
      {/* <div>
        <h2>Authors</h2>
        <ul>
          {setAuthors.length === 0 ? (
            <p>No authors found.</p>
          ) : (
            authors.map((author) => <li key={author._id}>{author.name}</li>)
          )}
        </ul>
      </div>
      <div>
        <h2>Categories</h2>
        <ul>
          {setCategories.length === 0 ? (
            <p>No categories found.</p>
          ) : (
            categories.map((category) => <li key={category._id}>{category.name}</li>)
          )}
        </ul>
      </div> */}
    </>
  );
}