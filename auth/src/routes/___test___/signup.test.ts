import request from "supertest";
import { app } from "../../app";

it("returns 201 successful signup", async () => {
  return await request(app)
    .post("/signup")
    .send({ email: "abc@abc.com", password: "12345678" })
    .expect(201);
});

it("returns 400 on invalid email in signup", async () => {
  await request(app)
    .post("/signup")
    .send({ email: "ababc.com", password: "12345678" })
    .expect(400);
});

it("disallows duplicate emails during signup", async () => {
  await request(app)
    .post("/signup")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(201);

  await request(app)
    .post("/signup")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(400);
});

it("check if a cookie returns from api after successful sign up", async () => {
  const res = await request(app)
    .post("/signup")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(201);
  expect(res.get("Set-Cookie")).toBeDefined();
});
