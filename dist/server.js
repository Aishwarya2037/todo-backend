"use strict";
// import app from "./app";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
// while connecting mysql
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./db"));
const PORT = Number(process.env.PORT) || 5000;
async function startServer() {
    try {
        const connection = await db_1.default.getConnection();
        console.log("MySQL connected successfully");
        connection.release();
        app_1.default.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.error("MySQL connection failed:", error);
        process.exit(1);
    }
}
startServer();
