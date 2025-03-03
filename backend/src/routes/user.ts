import { Router } from "express";
import { prisma } from "../server";

const router = Router();

// get the users
router.get("/", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

// update method -- update a user
router.put("/:id", async (req, res) => {
  const userId = parseInt(req.params.id);
  const { email, name } = req.body;
  const user = await prisma.user.update({
    where: { id: userId },
    data: { email, name },
  });
  res.status(200).json(user);
});

export default router;
