import express from "express";
const router = express.Router();
router.post("/", (_req, res) => res.json({ reply: "chat not implemented yet" }));
export default router;