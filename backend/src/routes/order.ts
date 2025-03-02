import { Router } from "express";

const router = Router();

router.post("/", (req, res) => {
  const message = "Order created successfully";

  res.status(200).json({ message });
});

router.get("/", (req, res) => {
  const message = "This is an order";
  res.status(200).json({ message });
});

export default router;
