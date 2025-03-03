import { Router } from "express";
import { prisma } from "../server";

const router = Router();

// get products
router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(products);
});

// delete method -- delete a product
router.delete("/:id", async (req, res) => {
  const productId = parseInt(req.params.id);
  await prisma.product.delete({
    where: { id: productId },
  });
  res.status(200).json({ message: `Product with ID ${productId} deleted` });
});

export default router;
