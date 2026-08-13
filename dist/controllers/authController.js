"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db"));
const JWT_SECRET = "todo_secret_key";
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }
        const [users] = await db_1.default.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (users.length > 0) {
            return res.status(409).json({
                message: "Email already registered",
            });
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const [result] = await db_1.default.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword]);
        const token = jsonwebtoken_1.default.sign({
            id: result.insertId,
            email,
        }, JWT_SECRET, { expiresIn: "1d" });
        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: result.insertId,
                name,
                email,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required",
            });
        }
        const [users] = await db_1.default.query("SELECT * FROM users WHERE email = ?", [
            email,
        ]);
        if (users.length === 0) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const user = users[0];
        const passwordMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error",
        });
    }
};
exports.login = login;
