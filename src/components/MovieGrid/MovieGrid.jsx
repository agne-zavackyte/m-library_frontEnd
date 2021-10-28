import React from "react";
import { Button, Loading, Poster } from "../";
import * as S from "./MovieGrid.style";
import {
 arrayOf,
 bool,
 func,
 string,
 number,
 objectOf,
 oneOfType,
} from "prop-types";

const MovieGrid = ({
 bttnType,
 button,
 callback,
 disabled,
 loading,
 posterType,
 shownData,
}) => {
 if (loading) {
  return <Loading />;
 }
 return (
  <S.PostersGrid>
   {shownData &&
    shownData.map((movie, index) => (
     <S.PosterContainer key={movie.id || index}>
      <Poster
       type={posterType}
       movie={movie}
       disabled={button && disabled(movie.imdb_id)}
      />
      {button ? (
       <S.ButtonWrapper>
        <Button
         primary
         handleClick={() => {
          callback(movie.imdb_id);
         }}
         type={bttnType}
         disabled={disabled(movie.imdb_id)}
        >
         About
        </Button>
       </S.ButtonWrapper>
      ) : null}
     </S.PosterContainer>
    ))}
  </S.PostersGrid>
 );
};

MovieGrid.propTypes = {
 bttnType: string,
 button: bool,
 callback: func,
 disabled: func,
 loading: bool,
 posterType: string,
 shownData: arrayOf(objectOf(oneOfType([string, number, bool]))),
};

export default MovieGrid;
