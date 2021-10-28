import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
 AboutContainer,
 Button,
 Divider,
 Heading,
 Loading,
 Main,
 MovieDetails,
 MovieGrid,
 Notification,
 Pagination,
 Poster,
 Review,
 ReviewTextarea,
 Section,
 VideoPlay,
} from "../../components";
import { AuthContext } from "../../context/AuthContext";
import { MovieContext } from "../../context/MovieContext";
import {
 getSimilarMovie,
 getMovie,
 changeMovieStatus,
 deleteMovie,
 addCollection,
 addWatchlist,
 checkDatabase,
 addReview,
 getReviews,
 getAllMovieData,
} from "../func";
import { oscarIcon, page404 } from "../../assets";
import * as S from "./AboutMovie.style";

const AboutMovie = () => {
 const auth = useContext(AuthContext);
 let similarMoviesIds = useContext(MovieContext).similar;
 const history = useHistory();

 // Displayed movie ids for data fetch from DB and APIs
 const currentId = Number(localStorage.getItem("id"));
 const currentVideoId = localStorage.getItem("videoId");
 const currentImdbId = localStorage.getItem("imdbId");

 // ---> CURRENT MOVIE STATES
 // Fetched displayed movie data
 const [currentMovieData, setCurrentMovie] = useState({});
 const [currentMovieTrailer, setCurrentTrailer] = useState(null);

 // ---> SIMILAR MOVIES STATES
 // Fetched similar movies primary data (contains poster url, fanart url)
 const [primarySimMovieData, setPrimarySimMovieData] = useState([]);
 // Sets movies id after similar movie selection for more information
 const [selectedMovieId, setSelectedMovieId] = useState(null);
 // Set data from DB - does movie exist already
 const [selectedMovieDb, setSelectedMovieDb] = useState(null);
 // Set fetched selected similar movie data
 const [movieData, setMovieData] = useState({});

 // ---> DISPLAY STATES
 // Current movie button display state
 const [display, setDisplay] = useState(true);
 // Selected similar movie details container display state
 const [showMoreDetails, setShowMoreDetails] = useState(false);
 // Textarea display state
 const [displayTextarea, setDisplayTextarea] = useState(true);

 // ---> ERROR AND RESPONSE STATES
 // Response state from DB after query (updating current movie 'seen' value)
 const [response, setResponse] = useState("");
 // Response state from DB after query (adding similar movie)
 const [responseSimilar, setResponseSimilar] = useState(null);
 // Error state for failed query
 const [error, setError] = useState(null);
 const [reviewPostError, setReviewPostError] = useState(null);
 const [similarMovieError, setSimilarMovieError] = useState(null);

 // ---> LOADING STATES
 // Loading state for entire page
 const [loading, setLoading] = useState(false);
 // Loading state for selected similar movie data load
 const [similarDataLoading, setSimilarDataLoading] = useState(false);

 // ---> REVIEWS STATES
 // Fetch current movie reviews data from DB if present
 const [reviews, setReviews] = useState([]);

 // ---> PAGINATION
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(3);
 const indexOfLastReview = currentPage * postsPerPage;
 const displayedReviews = reviews.slice(
  indexOfLastReview - postsPerPage,
  indexOfLastReview
 );
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 useEffect(() => {
  setLoading(true);
  setReviewPostError(null);
  setPrimarySimMovieData([]);
  getMovie(
   auth,
   currentId,
   currentVideoId,
   setCurrentMovie,
   setCurrentTrailer,
   setLoading,
   setError
  );
  getReviews(auth, currentImdbId, setReviews, setError);
  similarMoviesIds &&
   similarMoviesIds !== null &&
   getSimilarMovie(similarMoviesIds, setPrimarySimMovieData, setError);
  window.scrollTo(0, 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
 }, [auth, similarMoviesIds, displayTextarea, display]);

 if (error !== null) {
  return (
   <Main cover={page404}>
    <Section>{error}</Section>
   </Main>
  );
 } else if (loading) {
  return (
   <Main>
    <Loading />
   </Main>
  );
 }

 return (
  <Main cover={currentMovieData.fanart} billboard>
   {/* ---> SELECTED MOVIE DETAILS */}
   <Section>
    <Heading size="big" hTitle={currentMovieData.title}>
     {currentMovieData && currentMovieData.oscars ? (
      <S.Oscar src={oscarIcon} alt="Oscar award statue" />
     ) : null}
    </Heading>
    <Divider />
    <S.FlexContainer>
     <div>
      <S.PosterBlock>
       <Poster movie={currentMovieData} />
      </S.PosterBlock>
      <S.ButtonBlock>
       {/* If movie seen = 'TRUE', don't display "Add to Collection" button */}
       {currentMovieData.seen ? null : (
        <S.ButtonWrap isDisplayed={display}>
         <Button
          primary={true}
          type="submit"
          handleClick={() => {
           //onClick change 'seen' from 'false' to 'true' in DB
           changeMovieStatus(auth, currentId, setResponse, setError);
           //according to changes made in DB, replace location from 'watchlist' to 'collection'
           history.replace(`/collection/about/${currentMovieData.title}`);
           setDisplay(false);
           setDisplayTextarea(true);
          }}
         >
          Add To Collection
         </Button>
        </S.ButtonWrap>
       )}
       <S.ButtonWrap isDisplayed={true}>
        <Button
         type="button"
         handleClick={() =>
          deleteMovie(auth, currentMovieData, history, setError)
         }
        >
         Remove
        </Button>
       </S.ButtonWrap>
      </S.ButtonBlock>
     </div>
     <S.DetailsContainer>
      {/* Set response notification after adding movie from watchlist to collection */}
      {response && <Notification>{response}</Notification>}
      <MovieDetails movie={currentMovieData} />
      {/* Display movie trailer if video ID is present in DB */}
      {currentMovieTrailer === null ? null : (
       <>
        <Divider />
        <S.VideoWrap>
         <VideoPlay src={currentMovieTrailer} />
        </S.VideoWrap>
       </>
      )}
     </S.DetailsContainer>
    </S.FlexContainer>
   </Section>
   <Divider />
   {/* ---> REVIEWS SECTION */}
   <Section>
    <Heading size="h2" hTitle="Reviews" />
    <S.ReviewsContainer>
     {reviewPostError && <Notification>{reviewPostError}</Notification>}
     {reviews.length === 0 ? (
      <S.InfoContainer>
       There are no reviews yet.
       {currentMovieData.seen ? " Be first to share yours!" : null}
      </S.InfoContainer>
     ) : (
      <>
       <Review reviews={displayedReviews} />
       <Pagination
        postsPerPage={postsPerPage}
        totalPosts={reviews.length}
        paginate={paginate}
        selected={currentPage}
       />
      </>
     )}
     <ReviewTextarea
      currenMovie={currentMovieData}
      movieReviews={reviews}
      movieId={currentId}
      callback={(newReview) => {
       //add new review to DB
       addReview(auth, currentId, newReview, currentImdbId, setReviewPostError);
       //set 'false' for displaying comment box textarea
       setDisplayTextarea(false);
      }}
     />
    </S.ReviewsContainer>
   </Section>
   <S.StyledSection>
    <Divider />
    <Heading size="h2" hTitle="Similar Movies" marginTopBig />
   </S.StyledSection>
   {/* DISPLAY SELECTED SIMILAR MOVIE DETAILS. FALSE BY DEFAULT */}
   <AboutContainer
    error={similarMovieError}
    loading={similarDataLoading}
    display={showMoreDetails}
    databaseCheck={selectedMovieDb}
    movie={movieData}
    response={responseSimilar}
    close={() => {
     setShowMoreDetails(false);
     setSelectedMovieId(null);
     setResponseSimilar(null);
     setMovieData({});
    }}
    check={selectedMovieDb}
    toCollection={() => {
     // if movie exists in DB already and it's 'seen' value is 'false' change 'seen' value to 'true'. Else add new movie data in DB
     selectedMovieDb.length !== 0 && selectedMovieDb[0].seen === 0
      ? changeMovieStatus(
         auth,
         selectedMovieDb[0].id,
         setResponseSimilar,
         setError
        )
      : addCollection(auth, movieData, setResponseSimilar, setError);
     setTimeout(
      () =>
       selectedMovieDb &&
       checkDatabase(auth, selectedMovieId, setSelectedMovieDb, setError),
      500
     );
    }}
    toWatchlist={() => {
     // add new movie to watchlist
     addWatchlist(auth, movieData, setResponseSimilar, setError);
     setTimeout(
      () => checkDatabase(auth, selectedMovieId, setSelectedMovieDb, setError),
      500
     );
    }}
   />

   {/* ---> PRIMARY SIMILAR MOVIES DATA */}
   <Section>
    {primarySimMovieData.length === 0 ? (
     `No similar movie matches were found.`
    ) : (
     <MovieGrid
      button
      bttnType="button"
      disabled={(selected) => showMoreDetails && selectedMovieId === selected}
      shownData={
       primarySimMovieData &&
       primarySimMovieData.filter((e) => e.status === "OK")
      }
      callback={(selected) => {
       //set loading state for additional data 'true'
       setSimilarDataLoading(true);
       setMovieData({});
       //set state with selected similar movie IMDB ID
       setSelectedMovieId(selected);
       //set display state for additional data 'true'
       setShowMoreDetails(true);
       //get selected similar movie data form API and DB
       getAllMovieData(
        auth,
        selected,
        setMovieData,
        //set movie data from DB (this state shows if movie is already in DB. If true, in what list it belongs - collection or watchlist)
        setSelectedMovieDb,
        setSimilarDataLoading,
        setSimilarMovieError
       );
      }}
     />
    )}
   </Section>
  </Main>
 );
};

export default AboutMovie;
