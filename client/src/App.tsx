import { Route, Routes } from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Root/Home";
import Signup from "Routes/Root/Signup";
import Login from "Routes/Root/Login";
import Profile from "Routes/User/Profile";
import Useredit from "Routes/User/Edit";
import Password from "Routes/User/Password";
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
        <Route path="/login" element={<Login />} />
        <Route
          path="/user"
          element={
            <LoggedInOnly>
              <Profile />
            </LoggedInOnly>
          }
        />
        <Route path="/user/edit" element={<Useredit />} />
        <Route path="/user/edit/password/" element={<Password />} />
      </Routes>
    </>
  );
}
export default App;
