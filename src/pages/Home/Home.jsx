import React, { useEffect, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getCollectionPreview, getWatchlistPreview } from "../func";
import {
 Button,
 Divider,
 Heading,
 Loading,
 Main,
 MovieGrid,
 Section,
 Swiper,
} from "../../components";
import * as S from "./Home.style";
import { Link } from "react-router-dom";
import { defaultImg } from "../../assets";

const Home = () => {
 const auth = useContext(AuthContext);

 //  COLLECTION AND WATCHLIST PREVIEW STATES
 const [collection, setCollection] = useState([]);
 const [watchlist, setWatchlist] = useState([]);

 //  LOADING AND ERROR STATES
 const [watchlistLoading, setWatchlistLoading] = useState(false);
 const [collectionLoading, setCollectionLoading] = useState(false);
 const [error, setError] = useState(null);

 useEffect(() => {
  setWatchlistLoading(true);
  setCollectionLoading(true);
  getCollectionPreview(auth, setCollection, setCollectionLoading, setError);
  getWatchlistPreview(auth, setWatchlist, setWatchlistLoading, setError);
 }, [auth]);

 return (
  <Main cover={defaultImg}>
   <Section>
    <S.MainHeading>MOVIE LIBRARY</S.MainHeading>
   </Section>

   <Divider />
   {error ? (
    <Section>{error}</Section>
   ) : (
    <>
     {/* WATCHLIST SECTION */}
     {watchlistLoading ? (
      <Loading />
     ) : (
      <>
       {watchlist && watchlist.length === 0 ? (
        <Section>
         <Heading marginTopBig hTitle="MY WATCHLIST" />
         Your Watchlist is empty. Explore for movies!
        </Section>
       ) : (
        <Section fullWidth>
         <S.AlignContainer>
          <Heading marginTopBig hTitle="MY WATCHLIST" />
         </S.AlignContainer>

         <Swiper movieData={watchlist} noBg={false} />
         <S.ButtonWrap>
          <Link to="/library/watchlist">
           <Button type="button" primary={true}>
            View All
           </Button>
          </Link>
         </S.ButtonWrap>
        </Section>
       )}
      </>
     )}

     <Section>
      <Divider />
      <Heading marginTopBig hTitle="MY COLLECTION" />

      {/* COLLECTION SECTION */}
      {collectionLoading ? (
       <Loading />
      ) : (
       <>
        {collection && collection.length === 0 ? (
         `Your Collection is empty. Explore for movies!`
        ) : (
         <>
          <MovieGrid shownData={collection} />
          <S.ButtonWrap>
           <Link to="/library/collection">
            <Button type="button" primary={true}>
             View All
            </Button>
           </Link>
          </S.ButtonWrap>
         </>
        )}
       </>
      )}
     </Section>
    </>
   )}
  </Main>
 );
};

export default Home;
