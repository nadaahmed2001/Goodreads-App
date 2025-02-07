
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

export default function Author({ authors }) {
  return (
    <>

      <section className="authors-card">
        {authors.map((author) => (
          <div className="author-card" key={author._id}> {/* Use author._id as the key */}

            <Link to={`/AuthorDetails/${author._id}`} className="Auname"><h3>{author.name}</h3></Link>

            {/* Use author._id in the Link */}
            <div className='container d-flex'>
              <img src={author.image} alt={author.name} />
              <p><span>{author.birthDate}</span><br></br>{author.bio}</p>
            </div>
          </div>
        ))}

      </section>
      <Stack spacing={2}>
        <Pagination className='pagination'
          count={10}
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>
    </>
  );
}