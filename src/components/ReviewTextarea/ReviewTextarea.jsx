import React, { useState } from "react";
import { Button } from "../";
import * as S from "./ReviewTextarea.style";
import {
 arrayOf,
 bool,
 func,
 number,
 objectOf,
 oneOfType,
 string,
} from "prop-types";

const Reviewtextarea = ({
 callback,
 currenMovie,
 movieId,
 movieReviews,
 type,
}) => {
 const [newReview, setNewReview] = useState("");
 return (
  <>
   {/* If current movie 'seen' value is 'false' or current movie is already reviewed by current user - don't display box of textarea */}
   {!currenMovie.seen ||
   (currenMovie.seen &&
    movieReviews.filter((e) => e.movie_id === movieId).length !== 0) ? null : (
    <S.Form onSubmit={(e) => e.preventDefault()}>
     <S.ReviewTextArea
      placeholder="Write a review..."
      rows="4"
      onChange={(e) => setNewReview(e.target.value)}
     />
     <Button
      primary={true}
      type="button"
      width="200px"
      handleClick={() => callback(newReview)}
     >
      Submit
     </Button>
    </S.Form>
   )}
  </>
 );
};

Reviewtextarea.propTypes = {
 callback: func,
 currenMovie: objectOf(oneOfType([string, number, bool])),
 movieId: number,
 movieReviews: arrayOf(objectOf(oneOfType([number, string]))),
 type: string,
};

export default Reviewtextarea;
