import React from "react";
import { Divider, Heading } from "../";
import * as S from "./MovieDetails.style";
import { bool, number, objectOf, oneOfType, string } from "prop-types";

const MovieDetails = ({ movie }) => {
 const data = [
  { id: 1, dataType: "IMDB", dataValue: `${movie.rating} / 10` },
  { id: 2, dataType: "RELEASE DATE", dataValue: movie.year },
  { id: 3, dataType: "DURATION", dataValue: `${movie.duration} min.` },
  { id: 4, dataType: "GENRES", dataValue: movie.genres },
 ];

 return (
  <S.Container>
   <S.FlexColumn>
    {data.map((type) => (
     <div key={type.id}>
      <S.DataType>{type.dataType}:</S.DataType>
      <S.DataValue> {type.dataValue}</S.DataValue>
     </div>
    ))}
   </S.FlexColumn>
   <Divider />
   <Heading size="h2" hTitle="Storyline" />
   {movie.tagline !== null ? <S.Tagline>{movie.tagline}</S.Tagline> : null}
   <S.Storyline>{movie.description}</S.Storyline>
  </S.Container>
 );
};

MovieDetails.propTypes = {
 movie: objectOf(oneOfType([string, number, bool])),
};

export default MovieDetails;
