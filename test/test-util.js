import { prismaClient } from "../src/application/database.js";
import bcrypt from "bcrypt";

export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      email: "test@gmail.com",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      email: "test@gmail.com",
      password: await bcrypt.hash("rahasia", 10),
      username: "test",
      name: "test",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      email: "test@gmail.com",
    },
  });
};
