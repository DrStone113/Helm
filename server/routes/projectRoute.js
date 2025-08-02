import express from "express";
import { createProject, getProject } from "../controllers/projectController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createProject);
router.get("/:id", protectRoute, getProject);

export default router;
