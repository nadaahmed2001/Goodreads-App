
import React from 'react';
import './Authors-Book.css';
import { Link } from 'react-router-dom';

export default function Author({ authors }) {
  return (
    <section className="cards">
      {authors.map((author) => (
        <div className="card" key={author._id}> {/* Use author._id as the key */}
          <h3>
            <Link to={`/AuthorDetails/${author._id}`}>{author.name}</Link>
            
             {/* Use author._id in the Link */}
          </h3>
          <img src={author.image} alt={author.name} />
          <p>{author.bio}</p>
        </div>
      ))}
    </section>
  );
}