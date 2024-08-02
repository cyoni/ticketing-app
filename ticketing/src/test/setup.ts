import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import { app } from "../app";
import jwt from "jsonwebtoken";

let mongo: MongoMemoryServer;
beforeAll(async () => {
  process.env.JWT_KEY = "my-secret!";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (const collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

declare global {
  var signup: () => string;
}

global.signup = () => {
  const payload = {
    id: "12355",
    email: "abc@abc.com",
  };

  console.log("process@@@@@@@@@@@@@@@@@@@@@@@@.env.JWT_KEY",process.env.JWT_KEY)
  const token = jwt.sign(
    { id: payload.id, email: payload.email },
    process.env.JWT_KEY!
  );

  const session = { jwt: token };
  
  console.log("SESSIOB", session)

  const json = JSON.stringify(session);

  const sessionBase64 = Buffer.from(json).toString("base64");

  return `ticketing-session=${sessionBase64}`;
};
