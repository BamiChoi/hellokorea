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

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/join"
          element={
            <LogoutOnly>
              <Signup />
            </LogoutOnly>
          }
        />
        <Route
          path="/login"
          element={
            <LogoutOnly>
              <Login />
            </LogoutOnly>
          }
        />
        <Route
          path="/user"
          element={
            <LoggedInOnly>
              <Profile />
            </LoggedInOnly>
          }
        />
        <Route
          path="/user/edit"
          element={
            <LoggedInOnly>
              <Useredit />
            </LoggedInOnly>
          }
        />
        <Route
          path="/user/edit/password/"
          element={
            <LoggedInOnly>
              <Password />{" "}
            </LoggedInOnly>
          }
        />
        <Route path="/board/:theme" element={<Board></Board>}></Route>
        <Route path="/board/:theme/write" element={<Write></Write>}></Route>
      </Routes>
    </>
  );
}
export default App;
