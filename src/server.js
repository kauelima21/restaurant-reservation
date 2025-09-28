import express from "express";
import { PORT } from "./config.js";
import { AuthController } from "./controllers/authController.js";
import { TableController } from "./controllers/tableController.js";

const app = express();

app.use(express.json());

// AUTH
app.post("/sign-up", (req, res) => AuthController.signUp(req, res));
app.post("/sign-in", (req, res) => AuthController.signIn(req, res));

// TABLES
app.post("/tables", (req, res) => TableController.createTable(req, res));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
