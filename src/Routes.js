import React, { useContext, Suspense, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import { Header, Loading, Footer, PrivateRoute, Main } from "./components";

const LoginLazy = lazy(() => import("./pages/Login/Login"));
const HomeLazy = lazy(() => import("./pages/Home/Home"));
const LibraryLazy = lazy(() => import("./pages/Library/Library"));
const AboutLazy = lazy(() => import("./pages/AboutMovie/AboutMovie"));
const SearchLazy = lazy(() => import("./pages/Search/Search"));
const NotFoundPageLazy = lazy(() =>
 import("./pages/NotFoundPage/NotFoundPage")
);

function Routes() {
 const auth = useContext(AuthContext);

 return (
  <Router>
   <Header
    loggedIn={auth.token}
    logOut={() => {
     auth.updateToken("");
     localStorage.removeItem("token");
     localStorage.removeItem("similar");
     localStorage.removeItem("id");
     localStorage.removeItem("videoId");
     localStorage.removeItem("imdbId");
    }}
   />
   <Suspense
    fallback={
     <Main>
      <Loading />
     </Main>
    }
   >
    <Switch>
     <Route path="/login" component={LoginLazy} />
     <PrivateRoute exact path="/" component={HomeLazy} />
     <PrivateRoute
      exact
      path="/library/:collection:watchlist"
      component={LibraryLazy}
     />
     <PrivateRoute exact path="/search" component={SearchLazy} />
     <PrivateRoute
      exact
      path="/:collection:watchlist/about/:title"
      component={AboutLazy}
     />
     <PrivateRoute path="" component={NotFoundPageLazy} />
    </Switch>
   </Suspense>
   <Footer />
  </Router>
 );
}

export default Routes;
