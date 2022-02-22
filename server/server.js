import express from "express";
import test from "./routers/test";

const PORT = 4000;

const app = express();

app.use("/api", test);

const handleListening = () =>
  console.log(`Server listening on port http://localhost:${PORT} 🚀`);
app.listen(PORT, handleListening);
