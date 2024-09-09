import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const clientId = randomBytes(4).toString("hex");

const stan = nats.connect("ticketing", clientId, {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to Nats. Client Id:", clientId);

  const options = stan.subscriptionOptions().setManualAckMode(true);

  const subscription = stan.subscribe("ticket:create", "orders-queue", options);

  subscription.on("message", (msg: Message) => {
    console.log(
      `Received event: #${msg.getSequence()}, message: ${msg.getData()}`
    );
    msg.ack();
  });
});

process.on("SIGINT", ()=> stan.close())
process.on("SIGTERM", ()=> stan.close())