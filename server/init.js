import regeneratorRuntime from "regenerator-runtime";
import "./db";
import "./models/User";
import "./models/Post";
import "./models/Comment";
import "./models/Recomment";
import "./models/Message";
import "./models/Chat";
import app from "./server";

const PORT = 4000;

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);

app.listen(PORT, handleListening);
