import { Route, Routes } from "react-router-dom";
import Header from "Components/header/Header";
import Home from "Routes/Home";
import Signup from "Routes/Signup";
import Login from "Routes/Login";
import Password from "Routes/User/Password";
import Board from "Routes/Post/Board";
import Write from "Routes/Post/Write";
import LogoutOnly from "Routes/middlewares/LogoutOnly";
import LoggedInOnly from "Routes/middlewares/LoggedInOnly";
import Post from "Routes/Post/Post";
import ProfileEdit from "Routes/User/Edit";
import PostEdit from "Routes/Post/Edit";
import Delete from "Routes/Post/Delete";
import WithCategory from "Routes/middlewares/WithCategory";
import Bookmarks from "Routes/User/Bookmarks";
import Nav from "Components/navigator/Nav";
import Service from "Routes/Service/Service";
import SearchResult from "Routes/Post/SearchResult";
import MyProfile from "Routes/User/MyProfile";
import UserProfile from "Routes/User/UserProfile";
import Chats from "Routes/Chat/Chats";
import Chatroom from "Routes/Chat/Chatroom";

function App() {
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
                <MyProfile />
              </LoggedInOnly>
            }
          />
          <Route
            path="bookmarks"
            element={
              <LoggedInOnly>
                <Bookmarks />
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
          <Route
            path=":userId"
            element={
              <LoggedInOnly>
                <UserProfile />
              </LoggedInOnly>
            }
          />
        </Route>
        <Route path=":category">
          <Route
            index
            element={
              <WithCategory>
                <Board />
              </WithCategory>
            }
          />
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
            />
          </Route>
          <Route
            path=":postId/edit"
            element={
              <LoggedInOnly>
                <PostEdit />
              </LoggedInOnly>
            }
          />
          <Route
            path="search"
            element={
              <WithCategory>
                <SearchResult />
              </WithCategory>
            }
          />
        </Route>
        <Route path="service">
          <Route
            index
            element={
              <LoggedInOnly>
                <Service />
              </LoggedInOnly>
            }
          />
        </Route>
        <Route path="chat">
          <Route
            index
            element={
              <LoggedInOnly>
                <Chats />
              </LoggedInOnly>
            }
          />
          <Route
            path=":chatRoomId"
            element={
              <LoggedInOnly>
                <Chatroom />
              </LoggedInOnly>
            }
          />
        </Route>
      </Routes>
      <Nav />
    </>
  );
}
export default App;
