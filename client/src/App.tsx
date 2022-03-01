import { Route, Routes } from "react-router-dom";
import Header from "Components/Header";
import Home from "Routes/Root/Home";
import Signup from "Routes/Root/Signup";
import Login from "Routes/Root/Login";
import Profile from "Routes/User/Profile";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/join" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
