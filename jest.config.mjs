import dotenv from "dotenv";

dotenv.config({
  path: ".env.dev",
});

export default {
  verbose: true,
  testEnvironment: "node",
  testMatch: ["**/*.test.js"],
};
