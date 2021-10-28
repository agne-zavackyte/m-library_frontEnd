// FETCH SETTINGS
const host1 = {
 headers: {
  "x-rapidapi-key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
  "x-rapidapi-host": `${process.env.REACT_APP_X_RAPIDAPI_HOST}`,
 },
};

const host2 = {
 headers: {
  "x-rapidapi-key": `${process.env.REACT_APP_X_RAPIDAPI_KEY}`,
  "x-rapidapi-host": `${process.env.REACT_APP_X_RAPIDAPI_HOST2}`,
 },
};

const get = (authorization) => ({
 headers: {
  Authorization: `Bearer ${authorization.token}`,
 },
});

const post = (authorization, data) => ({
 method: "POST",
 headers: {
  "Content-Type": "application/json",
  Authorization: `Bearer ${authorization.token}`,
 },
 body: JSON.stringify(data),
});

//LOGIN PAGE. LOGIN FUNCTION.
export const login = async (dataBody, auth, setError, history) => {
 try {
  const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/login`, {
   method: "POST",
   headers: {
    "Content-Type": "application/json",
   },
   body: JSON.stringify(dataBody),
  });
  const data = await response.json();
  return data.token
   ? (auth.updateToken(data.token), history.push("/"))
   : setError(data.msg);
 } catch (error) {
  return console.log(`Oops.. something went wrong! ${error}.`);
 }
};

//FETCH COLLECTION PREVIEW DATA FROM DB
export const getCollectionPreview = async (
 auth,
 setCollection,
 setLoading,
 setError
) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/collectionPreview/`,
   get(auth)
  );
  const data = await response.json();
  // eslint-disable-next-line
  return setCollection(data), setLoading(false);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//FETCH WATCHLIST PREVIEW DATA FROM DB
export const getWatchlistPreview = async (
 auth,
 setWatchlist,
 setLoading,
 setError
) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/watchlistPreview/`,
   get(auth)
  );
  const data = await response.json();
  // eslint-disable-next-line
  return setWatchlist(data), setLoading(false);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET USERS COLLECTION DATA FROM DB
export const getFullCollectionData = async (
 auth,
 setFullCollection,
 setLoading,
 setError
) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/collection/`,
   get(auth)
  );
  const data = await response.json();
  // eslint-disable-next-line
  return setFullCollection(data), setLoading(false);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET USERS WATCHLIST DATA FROM DB
export const getFullWatchlistData = async (
 auth,
 setFullWatchlist,
 setLoading,
 setError
) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/watchlist/`,
   get(auth)
  );
  const data = await response.json();
  // eslint-disable-next-line
  return setFullWatchlist(data), setLoading(false);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//DISPLAY POST ACCORDING TO FILTER VALUES
export const filteredData = (allMovies, inputValue, selectValue) =>
 allMovies &&
 allMovies.filter(
  (movie) =>
   movie.title.toLowerCase().includes(inputValue) &&
   movie.genres.toLowerCase().includes(selectValue !== "all" ? selectValue : "")
 );

//SET DROPDOWN VALUES
export const options = (n) => {
 let options = n.map((movie) => movie.genres);
 return (options = [
  ...new Set(
   options
    .join(", ")
    .split(", ")
    .sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))
  ),
 ]);
};

//FETCH MOVIE DATA FROM DATABASE AND API
export const getMovie = async (
 auth,
 selectedId,
 video,
 setMovie,
 setPlayback,
 setLoading,
 setError
) => {
 try {
  const dbResponse = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/collection/${selectedId}`,
   get(auth)
  );
  const mediaResponse = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST2}/title/get-video-playback?viconst=vi${video}&region=GB`,
   host2
  );

  const bdData = await dbResponse.json();
  const videoData = await mediaResponse.json();

  return (
   setMovie(bdData[0]),
   setPlayback(
    videoData.symbol !== "badrequest.parameter.invalid"
     ? videoData.resource.encodings[1].playUrl
     : null
   ),
   setLoading(false)
  );
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//MOVIE AND MOVIE DATA SEARCH FUNCTIONS
export const searchByTitle = async (
 inputValue,
 setPrimaryData,
 setLoading,
 setError
) => {
 try {
  const response = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST2}/auto-complete?q=${inputValue}`,
   host2
  );

  const data = await response.json();

  return (
   data.d === undefined
    ? setError(`Your search for '${inputValue}' did not have any matches.`)
    : data.d
       .filter(
        (results) =>
         results.i !== undefined &&
         results.id.includes("tt") &&
         results.q === "feature" &&
         results.y <= new Date().getFullYear()
       )
       .map((data) =>
        setPrimaryData((x) => [
         ...x,
         {
          imdb_id: data.id,
          poster: data.i && data.i.imageUrl,
          title: data.l,
         },
        ])
       ),
   setLoading(false)
  );
 } catch (error) {
  return (
   setLoading(false),
   setError(
    inputValue !== "" && `Oops.. something went wrong! ${error.message}.`
   )
  );
 }
};

//CHANGE MOVIE SEEN VALUE: FROM FALSE TO TRUE (ADDING MOVIE FROM WATCHLIST TO COLLECTION)
export const changeMovieStatus = async (auth, id, setResponse) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/watchlist/${id}`,
   post(auth)
  );
  const data = await response.json();
  return setResponse(data.msg);
 } catch (error) {
  setResponse(`Oops.. something went wrong! ${error.message}.`);
 }
};

//CHECK IN DATABASE WHETHERE POSTED MOVIE ALREADY EXISTS
export const checkDatabase = async (auth, id, setCheckedData, setError) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/allMovies/${id}/`,
   get(auth)
  );
  const data = await response.json();
  return setCheckedData(data);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//ADD NEW MOVIE TO COLLECTION
export const addCollection = async (auth, bodyData, setResponse, setError) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/collection/`,
   post(auth, bodyData)
  );
  const data = await response.json();
  return setResponse(data.msg);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//ADD NEW MOVIE TO WATCHLIST
export const addWatchlist = async (auth, bodyData, setResponse, setError) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/watchlist/`,
   post(auth, bodyData)
  );
  const data = await response.json();
  return setResponse(data.msg);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET ALL MOVIE DATA FOR POSTING TO DB
export const getAllMovieData = async (
 auth,
 imdbId,
 setMovieData,
 setCheckedData,
 setLoading,
 setError
) => {
 try {
  const about = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST}/?type=get-movie-details&imdb=${imdbId}`,
   host1
  );
  const assets = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST}/?type=get-movies-images-by-imdb&imdb=${imdbId}`,
   host1
  );
  const video = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST2}/title/get-hero-with-promoted-video?tconst=${imdbId}&purchaseCountry=US&currentCountry=US`,
   host2
  );
  const awardsData = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST2}/title/get-awards-summary?tconst=${imdbId}`,
   host2
  );
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/allMovies/${imdbId}/`,
   get(auth)
  );

  const aboutData = await about.json();
  const assetsData = await assets.json();
  const videoData = await video.json();
  const awards = await awardsData.json();
  const data = await response.json();

  return (
   setMovieData({
    imdb_id: aboutData.imdb_id,
    title: aboutData.title,
    year: Number(aboutData.year),
    genres: aboutData.genres.join(", "),
    duration: Number(aboutData.runtime),
    rating: Number(aboutData.imdb_rating),
    description: aboutData.description,
    tagline: aboutData.tagline,
    poster: assetsData.poster,
    fanart: assetsData.fanart,
    video_id: videoData.topVideos[0].id.slice(11),
    oscars:
     awards.awardsSummary.highlighted &&
     awards.awardsSummary.highlighted.awardName.includes("Oscar") &&
     awards.awardsSummary.highlighted.isWinner === true
      ? 1
      : 0,
   }),
   setCheckedData(data),
   setLoading(false)
  );
 } catch (error) {
  setLoading(false);
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//POST NEW REVIEW TO DB
export const addReview = async (auth, id, review, imdbId, setError) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/reviews/`,
   post(auth, { movie_id: id, review: review, imdb_id: imdbId })
  );
  const data = await response.json();
  return setError(data.msg);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET MOVIE REVIEWS FROM DB
export const getReviews = async (auth, imdbId, setReviews, setError) => {
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/reviews/${imdbId}`,
   get(auth)
  );
  const data = await response.json();
  return setReviews(data);
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET SIMILAR MOVIE PRIMARY DATA - IDs
export const getSimilarMoviesIDs = async (imdbId, similarMovies, setError) => {
 try {
  const response = await fetch(
   `https://${process.env.REACT_APP_X_RAPIDAPI_HOST2}/title/get-more-like-this?tconst=${imdbId}&currentCountry=US&purchaseCountry=LT`,
   host2
  );
  const data = await response.json();

  return similarMovies.updateSimilar(data.slice(0, 4));
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};

//GET SIMILAR MOVIE PRIMARY DATA FROM API
export const getSimilarMovie = (
 similarMoviesIds,
 setPrimarySimMovieData,
 setError
) => {
 similarMoviesIds.map((id) =>
  fetch(
   `https://${
    process.env.REACT_APP_X_RAPIDAPI_HOST
   }/?type=get-movies-images-by-imdb&imdb=${id.slice(7, 16)}`,
   host1
  )
   .then((res) => res.json())
   .then((data) =>
    setPrimarySimMovieData((x) => [
     ...x,
     {
      imdb_id: data.IMDB,
      poster: data.poster,
      status: data.status,
     },
    ])
   )
   .catch((error) => setError(`Oops.. something went wrong! ${error.message}.`))
 );
};

//DELETE MOVIE FROM DATABASE
export const deleteMovie = async (auth, movie, history, setError) => {
 const settings = {
  method: "DELETE",
  headers: {
   Authorization: `Bearer ${auth.token}`,
  },
 };
 try {
  const response = await fetch(
   `${process.env.REACT_APP_SERVER_URL}/delete/${movie.id}`,
   settings
  );
  const data = await response.json();
  return history.replace({
   pathname: movie.seen ? `/library/collection` : `/library/watchlist`,
   state: { msg: `"${movie.title}" ${data.msg}` },
  });
 } catch (error) {
  setError(`Oops.. something went wrong! ${error.message}.`);
 }
};
