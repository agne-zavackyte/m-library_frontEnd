import React, { useState, useContext } from "react";
import { MovieContext } from "../../context/MovieContext";
import { getSimilarMoviesIDs } from "../../pages/func";
import * as S from "./Poster.style";
import { bool, number, objectOf, oneOfType, string } from "prop-types";

const Poster = ({ disabled, movie, type }) => {
 const [display, setDisplay] = useState(false);

 const similarMovies = useContext(MovieContext);

 switch (type) {
  case "active":
   return (
    <>
     <S.Poster
      onMouseOver={() => setDisplay(true)}
      onMouseLeave={() => setDisplay(false)}
      isActive={display}
      src={movie.poster}
     >
      <S.IconContainer isActive={display}>
       <S.StyledLink
        to={
         movie.seen
          ? `/collection/about/${movie.title}`
          : `/watchlist/about/${movie.title}`
        }
        onClick={() => {
         getSimilarMoviesIDs(movie.imdb_id, similarMovies);
         localStorage.setItem("id", movie.id);
         localStorage.setItem("videoId", movie.video_id);
         localStorage.setItem("imdbId", movie.imdb_id);
        }}
       />
      </S.IconContainer>
      {type !== "active" && (movie.poster === "" || null) && (
       <S.NoImageTitle>{movie.title}</S.NoImageTitle>
      )}
     </S.Poster>
     <S.Details>
      IMDB: {movie.rating} / {movie.duration} min.
     </S.Details>
     <S.Title>
      {movie.title} ({movie.year})
     </S.Title>
    </>
   );

  case "details":
   return (
    <>
     <S.Poster src={movie.poster}>
      {(movie.poster === "" || null) && (
       <S.NoImageTitle>{movie.title}</S.NoImageTitle>
      )}
     </S.Poster>
     <S.Details>
      IMDB: {movie.rating} / {movie.duration} min.
     </S.Details>
     <S.Title>{movie.title}</S.Title>
    </>
   );

  default:
   return (
    <S.Poster src={movie.poster} isDisabled={disabled}>
     {(movie.poster === "" || null) && (
      <S.NoImageTitle>{movie.title}</S.NoImageTitle>
     )}
    </S.Poster>
   );
 }
};

Poster.propTypes = {
 disabled: bool,
 movie: objectOf(oneOfType([string, number, bool])),
 type: string,
};

export default Poster;
