import { faker } from "@faker-js/faker";
import database from "../src/libs/database";
import { AuthenticateUser } from "../src/services/authenticateUser";
import { CreateUser } from "../src/services/createUser";

async function clearDatabase() {
  await database.query("TRUNCATE reservations RESTART IDENTITY CASCADE;");
  await database.query("TRUNCATE users RESTART IDENTITY CASCADE;");
  await database.query("TRUNCATE tables RESTART IDENTITY CASCADE;");
}

async function createAndAuthenticateUser(user) {
  const userPayload = {
    name: user?.name ?? faker.person.fullName(),
    email: user?.email ?? faker.internet.email(),
    password: user?.password ?? `${faker.string.alphanumeric(8)}12345`,
    role: user?.role ?? "customer",
  };

  await new CreateUser().execute(userPayload);

  return await new AuthenticateUser().execute({
    email: userPayload.email,
    password: userPayload.password,
  });
}

export default {
  clearDatabase,
  createAndAuthenticateUser,
};
