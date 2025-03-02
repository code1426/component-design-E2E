import express from "express";

const app = express();

const PORT = 3000;
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello this root route");
});

app.get("/order", (req, res) => {
  res.send("Hello this home route");
});

app.get("/user", (req, res) => {
  res.send("Hello this login route");
});

app.get("/product", (req, res) => {
  res.send("product route");
});

// app.use("/api/home", getRoutes());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
