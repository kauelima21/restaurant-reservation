import database from "../src/libs/database";

async function clearUsers() {
  await database.query("DELETE FROM users;");
}

async function clearTables() {
  await database.query("DELETE FROM tables;");
}

export default {
  clearUsers,
  clearTables,
};
