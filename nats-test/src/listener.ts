import nats, { Message, Stan } from "node-nats-streaming";
import { randomBytes } from "crypto";
import { TickerCreatedListener } from "./events/ticket-created-listener";

const clientId = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to Nats. Client Id:", clientId);

  stan.on("close", () => {
    console.log("nats connection has been closed");
    process.exit();
  });
  new TickerCreatedListener(stan).listen();
});

process.on("SIGINT", () => stan.close());
process.on("SIGTERM", () => stan.close());
