import { Router } from "express";
import { prisma } from "../server";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the user." });
  }
});

router.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while fetching users." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { email, name } = req.body;
    const user = await prisma.user.update({
      where: { id: userId },
      data: { email, name },
    });
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the user." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: `User with ID ${userId} deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the user." });
  }
});

export default router;
