import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router";
import { AuthContext } from "../../context/AuthContext";
import {
 getFullCollectionData,
 getFullWatchlistData,
 filteredData,
 options,
} from "../func";
import {
 Button,
 Divider,
 Heading,
 Loading,
 Main,
 MovieGrid,
 Notification,
 Pagination,
 Section,
 Select,
} from "../../components";
import { defaultImg, searchIcon } from "../../assets";
import * as S from "./Library.style";

const Library = ({ match }) => {
 const auth = useContext(AuthContext);
 const history = useHistory();
 const route = match.url.slice(9);

 // Loading state
 const [loading, setLoading] = useState(false);
 // Error state for failed query
 const [error, setError] = useState(null);

 // ---> FETCHED DATA STATES
 const [fullCollection, setFullCollection] = useState([]);
 const [fullWatchlist, setFullWatchlist] = useState([]);

 // ---> FILTER STATES
 const [searchValue, setSearchValue] = useState("");
 const [moviesFilter, setFilter] = useState("all");

 // ---> DISPLAY STATES
 const [displayInput, setDisplayInput] = useState(false);
 // isActive ? displays collection data : watchlist data
 const [isActive, setActive] = useState(true);

 // ---> PAGINATION
 const [currentPage, setCurrentPage] = useState(1);
 const [postsPerPage] = useState(8);
 const indexOfLastPost = currentPage * postsPerPage;
 const paginate = (pageNumber) => setCurrentPage(pageNumber);
 // Loaded posts depending on filter values
 const loadedPosts = filteredData(
  isActive ? fullCollection : fullWatchlist,
  searchValue,
  moviesFilter
 );
 // Displayed posts per page depending on filter values
 const displayedPosts = loadedPosts.slice(
  indexOfLastPost - postsPerPage,
  indexOfLastPost
 );

 useEffect(() => {
  setLoading(true);
  setError(null);
  isActive &&
   getFullCollectionData(auth, setFullCollection, setLoading, setError);
  !isActive &&
   getFullWatchlistData(auth, setFullWatchlist, setLoading, setError);
  setTimeout(
   () => history.replace({ ...history.location, state: undefined }),
   7000
  );
  setActive(
   (route === "collection" && true) || (route === "watchlist" && false)
  );
  window.scrollTo(0, 0);
 }, [auth, isActive, history, route]);

 return (
  <Main cover={defaultImg}>
   {/* CONTROLS SECTION */}
   <Section>
    <Heading
     size="big"
     hTitle={`MY ${
      (route === "collection" && "COLECTION") ||
      (route === "watchlist" && "WATCHLIST")
     }`}
    />
    <S.ButtonContainer>
     <S.ButtonFlexWrap>
      <Button
       primary={isActive}
       type="button"
       double
       handleClick={() => {
        setActive(true);
        setDisplayInput(false);
        // Reset to default values
        setCurrentPage(1);
        setSearchValue("");
        setFilter("all");
        setFullCollection([]);
        history.push("/library/collection");
       }}
      >
       Collection
      </Button>
      <Button
       primary={!isActive}
       type="button"
       double
       handleClick={() => {
        setActive(false);
        setDisplayInput(false);
        setCurrentPage(1);
        setSearchValue("");
        setFilter("all");
        setFullWatchlist([]);
        history.push("/library/watchlist");
       }}
      >
       Watchlist
      </Button>
     </S.ButtonFlexWrap>
     <S.ButtonFlexWrap>
      <S.ButtonFlexWrap>
       <Button
        primary={true}
        type="button"
        icon={searchIcon}
        width="42px"
        // Disable button when fetched data length = 0
        disabled={
         (isActive && fullCollection.length === 0) ||
         (!isActive && fullWatchlist.length === 0)
        }
        handleClick={() => setDisplayInput(!displayInput)}
       />
       {/* Search by title */}
       <S.StyledInputField
        inputIsDisplayed={displayInput}
        type="text"
        placeholder="search"
        onChange={(e) => setSearchValue(e.target.value.trim().toLowerCase())}
       />
      </S.ButtonFlexWrap>
      {/* Filter by genre */}
      <Select
       disabled={
        (isActive && fullCollection.length === 0) ||
        (!isActive && fullWatchlist.length === 0)
       }
       options={isActive ? options(fullCollection) : options(fullWatchlist)}
       filterValue={moviesFilter}
       searchValue={searchValue}
       handleChange={(e) => setFilter(e.target.value.toLowerCase())}
      />
     </S.ButtonFlexWrap>
    </S.ButtonContainer>
   </Section>

   <Divider />

   {/* After removing movie from DB in 'About' page, we are getting response notification, which is located in history.location. It resets after 7 seconds */}
   {history && history.location.state && (
    <Section>
     <Notification>{history.location.state.msg}</Notification>
    </Section>
   )}

   {/* DISPLAYED MOVIES SECTION */}
   <Section>
    {error ? (
     error
    ) : loading ? (
     <Loading />
    ) : (
       isActive
        ? fullCollection && fullCollection.length > 0
        : fullWatchlist && fullWatchlist.length > 0
      ) ? (
     <MovieGrid posterType="active" shownData={displayedPosts} seen={true} />
    ) : (
     `Your ${isActive ? "Collection" : "Watchlist"} is empty. Add some movies!`
    )}
    <Pagination
     postsPerPage={postsPerPage}
     totalPosts={loadedPosts.length}
     paginate={paginate}
     selected={currentPage}
    />
   </Section>
  </Main>
 );
};

export default Library;
