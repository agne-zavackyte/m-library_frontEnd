import React from "react";
import * as S from "./AboutContainer.style";
import { Loading, MovieDetails, Notification, Section } from "..";
import {
 arrayOf,
 bool,
 func,
 number,
 objectOf,
 oneOfType,
 string,
} from "prop-types";
import { defaultImg } from "../../assets";

const AboutContainer = ({
 close,
 databaseCheck,
 display,
 error,
 loading,
 movie,
 response,
 toCollection,
 toWatchlist,
}) => {
 if (error) {
  return (
   <Section>
    <Notification>We are unable to load selected movie data.</Notification>
   </Section>
  );
 } else if (loading) {
  return <Loading />;
 }
 return (
  <>
   {/* according to checked data from database set notification for user if there is selected movie in database already, and if 'true' in what list */}
   {display && movie && databaseCheck && (
    <S.StyledSection fullWidth src={movie.fanart || defaultImg}>
     <S.Container>
      {(databaseCheck.length !== 0 && databaseCheck[0].seen === 1 && (
       <Notification>
        {response !== null
         ? response
         : `You have movie "${movie.title}" in your Collection. Explore for more!`}
       </Notification>
      )) ||
       (databaseCheck.length !== 0 && (
        <Notification>
         {response !== null
          ? response
          : `You have movie "${movie.title}" in your Watchlist. Add it to your
          Collection or explore for more!`}
        </Notification>
       ))}
      <S.StyledHeading>{movie.title}</S.StyledHeading>
      <MovieDetails movie={movie} />
      <S.Form onSubmit={(e) => e.preventDefault()}>
       <S.StyledButton
        type="submit"
        onClick={toCollection}
        primary={true}
        disabled={databaseCheck.length !== 0 && databaseCheck[0].seen === 1}
       >
        To Collection
       </S.StyledButton>
       <S.StyledButton
        type="submit"
        onClick={toWatchlist}
        primary={true}
        disabled={databaseCheck.length !== 0}
       >
        To Watchlist
       </S.StyledButton>
       <S.StyledButton
        type="button"
        onClick={close}
        primary={databaseCheck.length !== 0 && databaseCheck[0].seen === 1}
       >
        Close
       </S.StyledButton>
      </S.Form>
     </S.Container>
    </S.StyledSection>
   )}
  </>
 );
};

AboutContainer.propTypes = {
 close: func,
 databaseCheck: arrayOf(objectOf(oneOfType([string, number, bool]))),
 display: bool,
 error: string,
 loading: bool,
 movie: objectOf(oneOfType([string, number, bool])),
 response: string,
 toCollection: func,
 toWatchlist: func,
};

export default AboutContainer;
