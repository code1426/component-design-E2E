import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order";
import userRoutes from "./routes/user";
import productRoutes from "./routes/product";

const app = express();

const PORT = 3000;
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello this root route");
});

app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
