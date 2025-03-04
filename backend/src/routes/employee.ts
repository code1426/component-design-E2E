import { Router } from "express";
import { prisma } from "../server";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching employees." });
  }
});

export default router;
