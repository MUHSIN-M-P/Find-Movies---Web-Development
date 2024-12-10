import React, { lazy, Suspense } from "react";
import { NavigationBar } from "./Components/Navigation panel/NavigationBar";
import { Footer } from "./Components/Footer/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Loading } from "./Components/Loading/Loading";
const Home = lazy(() =>
  import("./Components/Home/Home").then((module) => ({ default: module.Home }))
);
const Login = lazy(() =>
  import("./Components/Login/Login").then((module) => ({
    default: module.Login,
  }))
);
const SignUp = lazy(() =>
  import("./Components/Signup/Signup").then((module) => ({
    default: module.SignUp,
  }))
);
const Media = lazy(() =>
  import("./Components/Media/Media").then((module) => ({
    default: module.Media,
  }))
);
const MovieDetails = lazy(() =>
  import("./Components/MovieDetails/MovieDetails").then((module) => ({
    default: module.MovieDetails,
  }))
);
const TVShowDetails = lazy(() =>
  import("./Components/TVShowDetails/TVShowDetails").then((module) => ({
    default: module.TVShowDetails,
  }))
);
const CreateGuest = lazy(() =>
  import("./Components/GuestAccount/createGuest").then((module) => ({
    default: module.CreateGuest,
  }))
);
const NotFound = lazy(() =>
  import("./Components/NotFound/NotFound").then((module) => ({
    default: module.NotFound,
  }))
);

const Account = lazy(() => {
  return import("./Components/Account/Account").then((module) => ({
    default: module.Account,
  }));
});

const Watchlist = lazy(() =>
  import("./Components/Watchlist/Watchlist").then((module) => ({
    default: module.Watchlist,
  }))
);

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <NavigationBar />

        <div className="content">
          <Suspense fallback={<Loading />}>
            {/* Suspense shows a fallback (like a loading spinner) while the component is being fetched. */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signUp" element={<SignUp />} />

              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/tvShow/:id" element={<TVShowDetails />} />

              <Route path="/account" element={<Account />} />
              <Route path="/create-guest" element={<CreateGuest />} />

              <Route path="/watch-list" element={<Watchlist />} />
              <Route path="/media" element={<Media />} />
              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
