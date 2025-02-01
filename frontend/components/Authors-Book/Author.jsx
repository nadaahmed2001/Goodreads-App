// import React from 'react'
// import './Authors-Book.css';
// export default function Author() {
//   return (
//     <>
//   <section className="cards">
// <div className='card'>
// <h3></h3>
// <img></img>
// <p></p>
// </div>
//   </section>
//     </>
//   )
// }
import React from 'react';
import './Authors-Book.css';

export default function Author({ authors }) {
  return (
    <section className="cards">
      {authors.map((author) => (
        <div className="card" key={author.id}>
          <h3>{author.name}</h3>
          <img src={author.image} alt={author.name} />
          {/* <p>{author.bio}</p> */}
        </div>
      ))}
    </section>
  );
}
