
import React from 'react';
import './Authors-Book.css';
import { Link } from 'react-router-dom';
import './Authors-Book.css';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Nav } from 'react-bootstrap';
import { useState} from 'react';
import FooterPage from '../../src/Pages/Footer/FooterPage';

export default function Author({ authors }) {
  const [currentPage, setCurrentPage] = useState(1);
  
  const itemsPerPage = 6;
  
 
  const totalPages = Math.ceil(authors.length / itemsPerPage);


  const currentAuthors = authors.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);


  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  return (
    <>

<section className="authors-card">
        {currentAuthors.map((author) => (
          <div className="author-card" key={author._id}> {/* Use author._id as the key */}
            <Link to={`/AuthorDetails/${author._id}`} className="Auname">
              <h3>{author.name}</h3>
            </Link>

            {/* Author Details */}
            <div className="container d-flex">
              <img src={author.image} alt={author.name} />
              <p>
                <span>{author.birthDate}</span>
                <br />
                {author.bio}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* Pagination Component */}
      <Stack spacing={2}>
        <Pagination
          className="pagination"
          count={totalPages} 
          page={currentPage}
          onChange={handlePageChange} 
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
      <FooterPage />
    </>
  );
}