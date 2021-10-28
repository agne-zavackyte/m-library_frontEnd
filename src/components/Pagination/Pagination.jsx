import React from "react";
import * as S from "./Pagination.style";
import { func, number } from "prop-types";

const Pagination = ({ paginate, postsPerPage, selected, totalPosts }) => {
 const pageNumbers = [];

 for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
  pageNumbers.push(i);
 }

 if (pageNumbers.length <= 1) {
  return null;
 }

 return (
  <S.PageNumbers>
   {pageNumbers.map((number) => (
    <S.PageButton
     type="button"
     key={number}
     onClick={() => {
      paginate(number);
     }}
     selected={number === selected}
    >
     {number}
    </S.PageButton>
   ))}
  </S.PageNumbers>
 );
};

Pagination.propTypes = {
 paginate: func.isRequired,
 postsPerPage: number.isRequired,
 selected: number.isRequired,
 totalPosts: number.isRequired,
};

export default Pagination;
