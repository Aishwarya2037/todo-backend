import { Router } from "express";

import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo,
} from "../controllers/todoController";

import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.post("/", authenticateToken, createTodo);

router.get("/", authenticateToken, getTodos);

router.put("/:id", authenticateToken, updateTodo);

router.delete("/:id", authenticateToken, deleteTodo);

export default router;
