import { Route, Routes } from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Home";
import Signup from "Routes/Signup";
import Login from "Routes/Login";
import Profile from "Routes/User/Profile";
import Password from "Routes/User/Password";
import Board from "Routes/Post/Board";
import Write from "Routes/Post/Write";
import LogoutOnly from "Routes/protector/LogoutOnly";
import LoggedInOnly from "Routes/protector/LoggedInOnly";
import Post from "Routes/Post/Post";
import ProfileEdit from "Routes/User/Edit";
import PostEdit from "Routes/Post/Edit";
import Delete from "Routes/Post/Delete";
import { useDispatch } from "react-redux";
import axios from "axios";
import { logout } from "reducers/auth";
import { useEffect } from "react";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuth = async () => {
      await axios
        .get("/api/session/check-auth")
        .then((response) => {})
        .catch((error) => {
          dispatch(logout());
        });
    };
    checkAuth();
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route
            path="signup"
            element={
              <LogoutOnly>
                <Signup />
              </LogoutOnly>
            }
          />
          <Route
            path="login"
            element={
              <LogoutOnly>
                <Login />
              </LogoutOnly>
            }
          />
        </Route>
        <Route path="user">
          <Route
            index
            element={
              <LoggedInOnly>
                <Profile />
              </LoggedInOnly>
            }
          />
          <Route
            path="edit"
            element={
              <LoggedInOnly>
                <ProfileEdit />
              </LoggedInOnly>
            }
          />
          <Route
            path="edit/password/"
            element={
              <LoggedInOnly>
                <Password />
              </LoggedInOnly>
            }
          />
        </Route>
        <Route path=":category">
          <Route index element={<Board />} />
          <Route
            path="write"
            element={
              <LoggedInOnly>
                <Write />
              </LoggedInOnly>
            }
          ></Route>
          <Route path=":postId" element={<Post />}>
            <Route
              path="delete"
              element={
                <LoggedInOnly>
                  <Delete />
                </LoggedInOnly>
              }
            ></Route>
          </Route>
          <Route
            path=":postId/edit"
            element={
              <LoggedInOnly>
                <PostEdit />
              </LoggedInOnly>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
