import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/responseError.js";
import { getUserValidation, loginUserValidation, registerUserValidation, updateUserValidation } from "../validation/userValidation.js";
import { validate } from "../validation/validation.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

// user register
const register = async (request) => {
  const user = validate(registerUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  if (countUser === 1) {
    throw new ResponseError(400, "Email already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      id: true,
      email: true,
      name: true,
      modifiedDate: true,
    },
  });
};

// user login
const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  // select ke database menggunakan email
  const user = await prismaClient.user.findUnique({
    where: {
      email: loginRequest.email,
    },
    select: {
      email: true,
      password: true,
    },
  });

  // untuk mengecek jika user tidak ada throw error "Email or password wrong"
  if (!user) {
    throw new ResponseError(401, "Email or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password);
  // untuk mengecek jika password tidak valid throw error "Email or password wrong"
  if (!isPasswordValid) {
    throw new ResponseError(401, "Email or password wrong");
  }

  // membuat token baru
  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      email: user.email,
    },
    select: {
      token: true,
    },
  });
};

// user get
const get = async (email) => {
  email = validate(getUserValidation, email);

  // mengambil data dari database
  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });

  // untuk mengecek jika user tidak ada throw error "user is not found"

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

// user update
const update = async (request) => {
  const user = validate(updateUserValidation, request);

  // mengecek data dari database

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      email: user.email,
    },
  });

  // untuk mengecek jika user tidak ditemukan throw error "user is not found"
  if (totalUserInDatabase != 1) {
    throw new ResponseError(404, "user is not found");
  }

  const data = {};
  if (user.name) {
    data.name = user.name;
  }

  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      email: user.email,
    },
    data: data,
    select: {
      id: true,
      email: true,
      name: true,
      modifiedDate: true,
    },
  });
};

// user logout
const logout = async (email) => {
  email = validate(getUserValidation, email);

  const user = await prismaClient.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return prismaClient.user.update({
    where: {
      email: email,
    },
    data: {
      token: null,
    },
    select: {
      email: true,
    },
  });
};

export default { register, login, get, update, logout };
