import express from "express";
import {
  createWorkspace,
  deleteWorkspace,
  getUserWorkspaces,
  getWorkspace,
} from "../controllers/workspaceController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", protectRoute, createWorkspace);
router.get("/", protectRoute, getUserWorkspaces);
router.get("/:id", protectRoute, getWorkspace);
router.delete("/:id", protectRoute, deleteWorkspace);

export default router;
