// import app from "./app";

// const PORT = 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// while connecting mysql
// import dotenv from "dotenv";
// dotenv.config();

// import app from "./app";
// import db from "./db";

// const PORT = Number(process.env.PORT) || 5000;

// async function startServer() {
//   try {
//     const connection = await db.getConnection();

//     console.log("MySQL connected successfully");

//     connection.release();

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   } catch (error) {
//     console.error("MySQL connection failed:", error);
//     process.exit(1);
//   }
// }

// startServer();

import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import db from "./db";

const PORT = Number(process.env.PORT) || 5000;

async function startServer() {
  try {
    const connection = await db.getConnection();

    console.log("MySQL connected successfully");

    connection.release();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("MySQL connection failed:", error);
    process.exit(1);
  }
}

startServer();
