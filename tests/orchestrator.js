import database from "../src/libs/database";

async function clearUsers() {
  await database.query("DELETE FROM users;");
}

export default {
  clearUsers,
};
