"use strict";
// import express from "express";
// import cors from "cors";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import todoRoutes from "./routes/todoRoutes";
// const app = express();
// // Middleware
// app.use(cors());
// app.use(express.json());
// // Test route
// app.get("/", (req, res) => {
//   res.json({
//     success: true,
//     message: "Todo API is running",
//   });
// });
// // Todo routes
// app.use("/api/todos", todoRoutes);
// export default app;
// import express from "express";
// import cors from "cors";
// import db from "./db";
// const app = express();
// // app.use(cors());
// // app.use(express.json());
// app.get("/", (req, res) => {
//   res.json({
//     message: "Todo API is running",
//   });
// });
// app.get("/users", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM users");
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Database error",
//     });
//   }
// });
// // todos get
// app.get("/todos", async (req, res) => {
//   try {
//     const [rows] = await db.query("SELECT * FROM todos");
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Database error",
//     });
//   }
// });
// // todos post
// app.post("/todos", async (req, res) => {
//   try {
//     const { user_id, title } = req.body;
//     const [result] = await db.query(
//       `INSERT INTO todos (user_id, title)
//        VALUES (?, ?, ?)`,
//       [user_id, title],
//     );
//     res.status(201).json({
//       message: "Todo created successfully",
//       result,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: "Database error",
//     });
//   }
// });
// app.use(cors());
// app.use(express.json());
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const todoRoutes_1 = __importDefault(require("./routes/todoRoutes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "Todo API is running",
    });
});
app.use("/api/auth", authRoutes_1.default);
app.use("/api/todos", todoRoutes_1.default);
// app.get("/api/profile", authenticateToken, (req: AuthRequest, res) => {
//   res.json({
//     message: "You can access this protected API",
//     user: req.user,
//   });
// });
exports.default = app;
