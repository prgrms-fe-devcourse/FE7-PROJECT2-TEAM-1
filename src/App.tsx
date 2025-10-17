import { Route, Routes } from "react-router";
import Default from "./layouts/Default";
import Posts from "./pages/post/Posts";
import Write from "./pages/post/Write";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import SearchPosts from "./pages/search/SearchPosts";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Search from "./pages/search/Search";
import PublicOnlyRoute from "./components/routes/PublicOnlyRoute";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Default />}>
          <Route index element={<Home />} />
          {/* <Route path="posts/:topic" element={<Posts />} /> */}
          <Route path="posts" element={<Posts />} />
          <Route path="search" element={<Search />} />
          {/* <Route path="search/posts/:keyword" element={<SearchPosts />} /> */}
          <Route path="profile/:userId" element={<Profile />} />

          <Route element={<ProtectedRoute />}>
            <Route path="write" element={<Write />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
        <Route element={<PublicOnlyRoute />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
