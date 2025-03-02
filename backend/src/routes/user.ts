import { Router } from "express";

const router = Router();

router.get("/user", (req, res) => {
  res.send("Hello this is the user route");
});

export default router;
