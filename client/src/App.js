import axios from "axios";
import { useEffect } from "react";

function App() {
  const callApi = async () => {
    await axios.get("/api").then((res) => console.log(res.data.test));
  };

  useEffect(() => {
    callApi();
  }, []);
  return <div className="App">hello!</div>;
}

export default App;
