import { Router } from "express";
import { prisma } from "../server";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    const order = await prisma.order.create({
      data: {
        userId,
        productId,
        quantity,
      },
    });
    res.status(201).json(order);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the order." });
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await prisma.order.findMany();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "An error occurred while fetching orders." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    const { userId, productId, quantity } = req.body;
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { userId, productId, quantity },
    });
    res.status(200).json(order);
  } catch (error) {
    console.error("Error updating order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the order." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const orderId = parseInt(req.params.id);
    await prisma.order.delete({
      where: { id: orderId },
    });
    res.status(200).json({ message: `Order with ID ${orderId} deleted` });
  } catch (error) {
    console.error("Error deleting order:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the order." });
  }
});

export default router;
