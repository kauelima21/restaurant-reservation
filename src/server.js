import express from "express";
import { PORT } from "./config.js";
import { AuthController } from "./controllers/authController.js";
import { TableController } from "./controllers/tableController.js";
import { AuthMiddleware } from "./middlewares/AuthMiddleware.js";

const app = express();

app.use(express.json());

// AUTH
app.post("/sign-up", AuthController.signUp);
app.post("/sign-in", AuthController.signIn);

// TABLES
app.get(
  "/tables",
  (req, res, next) => AuthMiddleware.handle(req, res, next),
  TableController.fetchTables
);
app.post(
  "/tables",
  (req, res, next) => AuthMiddleware.handle(req, res, next, ["admin"]),
  TableController.createTable
);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
