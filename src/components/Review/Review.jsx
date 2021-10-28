import React from "react";
import * as S from "./Review.style";
import { arrayOf, number, objectOf, oneOfType, string } from "prop-types";

const Review = ({ reviews }) => {
 return (
  <>
   {reviews.map((review) => (
    <S.ReviewBlock key={review.id}>
     <S.FlexSB>
      <S.Username>{review.username}</S.Username>
      <S.DateAdded>{review.date.slice(0, 10)}</S.DateAdded>
     </S.FlexSB>
     <S.Review>{review.review}</S.Review>
    </S.ReviewBlock>
   ))}
  </>
 );
};

Review.propTypes = {
 reviews: arrayOf(objectOf(oneOfType([number, string]))),
};

export default Review;
