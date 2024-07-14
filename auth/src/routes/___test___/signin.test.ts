import request from "supertest";
import { app } from "../../app";

it("makes sure users signin with valid user", async () => {
  await request(app)
    .post("/signup")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(201);

  await request(app)
    .post("/signin")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(200);
});

it("makes sure users cant signin with nonexist email", async () => {
  return await request(app)
    .post("/signin")
    .send({ email: "nbneexiste@email.com", password: "12345678" })
    .expect(400);
});
