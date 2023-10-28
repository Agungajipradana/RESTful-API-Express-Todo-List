import supertest from "supertest";
import { app } from "../src/application/app.js";
import { removeTestUser, createTestUser, getTestUser } from "./test-util.js";
import bcrypt from "bcrypt";

// Unit test register
describe("POST /api/users", function () {
  afterEach(async () => {
    await removeTestUser();
  });

  // unit test register untuk yang berhasil dengan menampilkan "should can register new user"
  it("should can register new user", async () => {
    const result = await supertest(app).post("/api/users").send({
      email: "test@gmail.com",
      password: "rahasia",
      username: "test",
      name: "test",
    });
    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe("test");
    expect(result.body.data.name).toBe("test");
    expect(result.body.data.email).toBe("test@gmail.com");
    expect(result.body.data.password).toBeUndefined();
  });

  // unit test register untuk yang gagal dengan menampilkan "request is invalid"
  it("should reject if request is invalid", async () => {
    const result = await supertest(app).post("/api/users").send({
      email: "",
      password: "",
      username: "",
      name: "",
    });

    console.info(result.body);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined;
  });

  // unit test register untuk yang gagal dengan menampilkan "username already registered"
  //   it("should reject if username already registered", async () => {
  //     let result = await supertest(app).post("/api/users").send({
  //       email: "test@gmail.com",
  //       username: "test",
  //       password: "rahasia",
  //       name: "test",
  //     });

  //     console.info(result.body);

  //     expect(result.status).toBe(200);
  //     expect(result.body.data.username).toBe("test");
  //     expect(result.body.data.name).toBe("test");
  //     expect(result.body.data.email).toBe("test@gmail.com");
  //     expect(result.body.data.password).toBeUndefined();

  //     result = await supertest(app).post("/api/users").send({
  //       email: "test@gmail.com",
  //       password: "rahasia",
  //       username: "test",
  //       name: "test",
  //     });

  //     console.info(result.body);

  //     expect(result.status).toBe(400);
  //     expect(result.body.errors).toBeDefined();
  //   });
});
