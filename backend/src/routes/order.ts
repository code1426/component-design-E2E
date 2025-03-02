import { Router } from "express";

const router = Router();

router.get("/order", (req, res) => {
  res.send("Hello this is the order route");
});

export default router;
