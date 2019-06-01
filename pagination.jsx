import React, { Component } from "react";
import _ from "lodash";

const Pagination = Props => {
  const { itemCount, pageSize, currentPage } = Props;
  const pageCount = Math.ceil(itemCount / pageSize);
  if (pageCount === 1) return null;
  const Pages = _.range(1, pageCount + 1);

  return (
    <nav>
      <ul className="pagination">
        {Pages.map(page => (
          <li
            className={page === currentPage ? "page-item active" : "page-item"}
            key={page}
          >
            <a onClick={() => Props.onPageChange(page)} className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
