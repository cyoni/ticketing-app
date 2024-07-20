import request from "supertest";
import { app } from "../../app";

it("gets details of a user", async () => {
  const cookie = (await global.signup()) as string[];

  const user = await request(app)
    .get("/current-user")
    .set("Cookie", cookie)
    .expect(200);

  expect(user.body.currentUser.email).toBe("abc@abc.com");
});

it("makes sure unauthenticated user gets null", async () => {
  const res = await request(app).get("/current-user").send().expect(200);


  expect(res.body.currentUser).toBeNull();
});
