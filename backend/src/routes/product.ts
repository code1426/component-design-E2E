import { Router } from "express";
import { prisma } from "../server";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: { name, price },
    });
    res.status(201).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the product." });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching products." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, price } = req.body;
    const product = await prisma.product.update({
      where: { id: productId },
      data: { name, price },
    });
    res.status(200).json(product);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the product." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: productId },
    });
    res.status(200).json({ message: `Product with ID ${productId} deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the product." });
  }
});

export default router;
