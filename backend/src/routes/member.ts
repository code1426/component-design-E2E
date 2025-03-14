import { Router } from "express";
import { prisma } from "../server";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary,
      expectedDateOfDefense,
    } = req.body;
    const member = await prisma.member.create({
      data: {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary,
        expectedDateOfDefense,
      },
    });
    res.status(201).json(member);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while creating the member." });
  }
});

router.get("/", async (req, res) => {
  try {
    const employees = await prisma.member.findMany();
    res.status(200).json(employees);
  } catch (error) {
    console.error("Error fetching member:", error);
    res.status(500).json({ error: "An error occurred while fetching member." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const memberId = parseInt(req.params.id);
    const {
      firstName,
      lastName,
      groupName,
      role,
      expectedSalary,
      expectedDateOfDefense,
    } = req.body;
    const product = await prisma.member.update({
      where: { id: memberId },
      data: {
        firstName,
        lastName,
        groupName,
        role,
        expectedSalary,
        expectedDateOfDefense,
      },
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
    const memberId = parseInt(req.params.id);
    await prisma.product.delete({
      where: { id: memberId },
    });
    res.status(200).json({ message: `member with ID ${memberId} deleted` });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while deleting the member." });
  }
});

export default router;
