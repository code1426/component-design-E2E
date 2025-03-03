import { Router } from "express";
import { prisma } from "../server";

const router = Router();

// post method -- create an order
router.post("/", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = await prisma.order.create({
    data: {
      userId,
      productId,
      quantity,
    },
  });
  res.status(200).json(order);
});

// Read orders (GET)
router.get("/", async (req, res) => {
  const orders = await prisma.order.findMany();
  res.status(200).json(orders);
});

export default router;
