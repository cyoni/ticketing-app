import nats from "node-nats-streaming";
import { TickerCreatedPublisher } from "./events/ticket-created-publisher";
const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

console.clear();
stan.on("connect", async () => {
  const publisher = new TickerCreatedPublisher(stan);
  console.log("Publisher connected to Nats");

  const data = {
    id: "123",
    title: "concert333ferg",
    price: 60,
  };

  await publisher.publish(data);
});
