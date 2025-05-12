import { Router } from "express";
import { prisma } from "../server";

const router = Router();

// Create Checklist Item
router.post("/checklist/:taskId", async (req, res) => {
  try {
    const taskId = parseInt(req.params.taskId);
    const { text } = req.body;

    const checklistItem = await prisma.checklistItem.create({
      data: {
        text,
        taskId,
        completed: false,
      },
    });

    res.status(201).json(checklistItem);
  } catch (error) {
    console.error("Error creating checklist item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the checklist item." });
  }
});

// Update Checklist Item
router.put("/checklist/:itemId", async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);
    const { text, completed } = req.body;

    const updatedItem = await prisma.checklistItem.update({
      where: { id: itemId },
      data: { text, completed },
    });

    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating checklist item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating the checklist item." });
  }
});

// Delete Checklist Item
router.delete("/checklist/:itemId", async (req, res) => {
  try {
    const itemId = parseInt(req.params.itemId);

    await prisma.checklistItem.delete({ where: { id: itemId } });

    res
      .status(200)
      .json({ message: `Checklist item with ID ${itemId} deleted` });
  } catch (error) {
    console.error("Error deleting checklist item:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the checklist item." });
  }
});

export default router;
