import express from "express";
const router = express.Router();

// Example route
router.get("/", (req, res) => {
  res.json({ message: "Chat route working!" });
});

export default router;