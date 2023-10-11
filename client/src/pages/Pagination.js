import React from "react";

const Pagination = ({ totalPosts, postPerPage, setCurrentPage }) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pages.push(i);
  }

  return (
    <nav>
      <ul className="pagination " style={{paddingTop:"10px"}}>
        {pages.map((number) => (
          <li key={number} className="page-item">
            <a
              onClick={() => setCurrentPage(number)}
              href="#!"
              className="page-link"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
