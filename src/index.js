import { app } from "./application/app.js";


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
