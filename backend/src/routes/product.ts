import { Router } from "express";

const router = Router();

router.get("/product", (req, res) => {
  res.send("Hello this is the product route");
});

export default router;
