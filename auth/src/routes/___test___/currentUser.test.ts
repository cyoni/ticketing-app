import request from "supertest";
import { app } from "../../app";

it("gets details of a user", async () => {
  const res = await request(app)
    .post("/signup")
    .send({ email: "name@abc.com", password: "12345678" })
    .expect(201);

  const cookie = res.get("Set-Cookie") as string[];

  const user = await request(app)
    .post("/current-user")
    .set("Cookie", cookie)
    .expect(200);

  expect(user.body.currentUser.email).toBe("name@abc.com");
});
