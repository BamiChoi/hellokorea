import { Route, Routes } from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Root/Home";
import Signup from "Routes/Root/Signup";
import Login from "Routes/Root/Login";
import Profile from "Routes/User/Profile";
import Useredit from "Routes/User/Edit";
import Password from "Routes/User/Password";
import Board from "Routes/Post/Board";
import Write from "Routes/Post/Write";
import LogoutOnly from "Routes/LogoutOnly";
import LoggedInOnly from "Routes/LoggedInOnly";
import Post from "Routes/Post/Post";

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
                <Profile />
              </LoggedInOnly>
            }
          />
          <Route
            path="edit"
            element={
              <LoggedInOnly>
                <Useredit />
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
        <Route path="board">
          <Route path=":category" element={<Board />} />
          <Route path=":category/:postId" element={<Post />} />
          <Route
            path=":category/write"
            element={
              <LoggedInOnly>
                <Write />
              </LoggedInOnly>
            }
          ></Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
