import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";

// app.use(cors());
// dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
