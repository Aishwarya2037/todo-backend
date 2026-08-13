import { Response } from "express";
import db from "../db";
import { AuthRequest } from "../middleware/authMiddleware";

// ================= ADD TODO =================

export const createTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const userId = req.user!.id;

    const [result]: any = await db.query(
      `INSERT INTO todos (user_id, title, completed)
       VALUES (?, ?, ?)`,
      [userId, title.trim(), false],
    );

    res.status(201).json({
      message: "Todo created successfully",
      todo: {
        id: result.insertId,
        title: title.trim(),
        completed: false,
      },
    });
  } catch (error) {
    console.error("CREATE TODO ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= GET TODOS =================

export const getTodos = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user!.id;

    const [rows]: any = await db.query(
      `SELECT id, title, completed
       FROM todos
       WHERE user_id = ?
       ORDER BY id DESC`,
      [userId],
    );

    // Convert MySQL 0/1 to JavaScript false/true
    const todos = rows.map((todo: any) => ({
      id: todo.id,
      title: todo.title,
      completed: Boolean(todo.completed),
    }));

    res.status(200).json({
      todos,
    });
  } catch (error) {
    console.error("GET TODOS ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= UPDATE TODO =================

export const updateTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const { title, completed } = req.body;

    const userId = req.user!.id;

    // Validate title
    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    // Validate completed
    if (typeof completed !== "boolean") {
      return res.status(400).json({
        message: "Completed must be true or false",
      });
    }

    const [result]: any = await db.query(
      `UPDATE todos
       SET title = ?, completed = ?
       WHERE id = ?
       AND user_id = ?`,
      [title.trim(), completed ? 1 : 0, id, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    // Get updated todo
    const [rows]: any = await db.query(
      `SELECT id, title, completed
       FROM todos
       WHERE id = ?
       AND user_id = ?`,
      [id, userId],
    );

    const todo = rows[0];

    res.status(200).json({
      message: "Todo updated successfully",

      todo: {
        id: todo.id,
        title: todo.title,
        completed: Boolean(todo.completed),
      },
    });
  } catch (error) {
    console.error("UPDATE TODO ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= DELETE TODO =================

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const userId = req.user!.id;

    const [result]: any = await db.query(
      `DELETE FROM todos
       WHERE id = ?
       AND user_id = ?`,
      [id, userId],
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Todo not found",
      });
    }

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    console.error("DELETE TODO ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
