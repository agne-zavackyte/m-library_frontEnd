import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
 AboutContainer,
 Heading,
 InputField,
 Main,
 MovieGrid,
 Pagination,
 Section,
} from "../../components";
import {
 searchByTitle,
 getAllMovieData,
 checkDatabase,
 changeMovieStatus,
 addCollection,
 addWatchlist,
} from "../func";
import { searchIcon, page404 } from "../../assets/";
import * as S from "./Search.style";

const Search = () => {
 const auth = useContext(AuthContext);

 // Setting search value from input field
 const [searchValue, setSearchValue] = useState("");

 // Fetching primary movies data from API according to search value
 const [primaryData, setPrimaryData] = useState([]);

 // ---> SELECTED MOVIE STATES
 const [selectedMovieId, setSelectedMovieId] = useState(null);
 const [movieData, setMovieData] = useState({});
 const [selectedMovieDb, setSelectedMovieDb] = useState(null);

 // ---> DISPLAY STATE
 const [display, setDisplay] = useState(false);

 // ---> LOADING STATES
 const [loading, setLoading] = useState(false);
 const [additionalDataLoad, setAdditionalDataLoad] = useState(false);

 // ---> STATES FOR NOTIFICATIONS
 const [error, setError] = useState(null);
 const [response, setResponse] = useState(null);
 const [loadingError, setLoadingError] = useState(null);
 const [postError, setPostError] = useState(null);

 // ---> PAGINATION
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(4);
 const indexOfLastPost = currentPage * postsPerPage;
 const paginate = (pageNumber) => setCurrentPage(pageNumber);

 if (postError) {
  return (
   <Main cover={page404}>
    <Section>Oops.. Something went wrong. Try again later.</Section>
   </Main>
  );
 }

 return (
  <Main>
   {/* FORM SECTION */}
   <Section>
    <Heading size="big">Explore</Heading>
    <S.Form
     onSubmit={(e) => {
      e.preventDefault();
      setLoading(true);
      searchByTitle(searchValue, setPrimaryData, setLoading, setError);
      e.target.reset();
      setPrimaryData([]);
      setSearchValue("");
      setDisplay(false);
      setCurrentPage(1);
     }}
    >
     <InputField
      icon={searchIcon}
      placeholder="movie title..."
      type="text"
      handleChange={(e) => {
       setSearchValue(e.target.value.trim());
       setDisplay(false);
       setLoadingError(null);
       setError(null);
      }}
     />
    </S.Form>
   </Section>
   <S.StyledDivider />
   {/* ADITIONAL DATA DISPLAY. FALSE BY DEFAULT */}
   <AboutContainer
    error={loadingError}
    loading={additionalDataLoad}
    display={display}
    movie={movieData}
    databaseCheck={selectedMovieDb}
    response={response}
    toCollection={() => {
     selectedMovieDb.length !== 0 && selectedMovieDb[0].seen === 0
      ? changeMovieStatus(auth, selectedMovieDb[0].id, setResponse)
      : addCollection(auth, movieData, setResponse, setPostError);
     setTimeout(
      () =>
       selectedMovieDb &&
       checkDatabase(auth, selectedMovieId, setSelectedMovieDb),
      500
     );
    }}
    toWatchlist={() => {
     addWatchlist(auth, movieData, setResponse, setPostError);
     setTimeout(
      () =>
       checkDatabase(auth, movieData.imdb_id, setSelectedMovieDb, setError),
      100
     );
    }}
    close={() => {
     setDisplay(false);
     setSelectedMovieId(null);
     setResponse(null);
     setMovieData();
    }}
   />

   {/* DISPLAYED SEARCH RESULTS */}
   {error ? (
    <Section>{error}</Section>
   ) : (
    <Section>
     <MovieGrid
      loading={loading}
      button
      bttnType="button"
      disabled={(selected) => display && selectedMovieId === selected}
      shownData={primaryData.slice(
       indexOfLastPost - postsPerPage,
       indexOfLastPost
      )}
      callback={(selected) => {
       setLoadingError(null);
       setPostError(null);
       setAdditionalDataLoad(true);
       setMovieData();
       setSelectedMovieId(selected);
       setDisplay(true);
       getAllMovieData(
        auth,
        selected,
        setMovieData,
        setSelectedMovieDb,
        setAdditionalDataLoad,
        setLoadingError
       );
      }}
     />
    </Section>
   )}
   <Pagination
    postsPerPage={postsPerPage}
    totalPosts={primaryData.length}
    paginate={paginate}
    selected={currentPage}
   />
  </Main>
 );
};

export default Search;
