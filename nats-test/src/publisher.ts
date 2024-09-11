import nats from "node-nats-streaming";

const stan = nats.connect("ticketing", "abc", { url: "http://localhost:4222" });

console.clear();
stan.on("connect", () => {
  console.log("Publisher connected to Nats");

  const data = JSON.stringify({
    id: "123",
    title: "concert333ferg",
    price: 60,
  });

  stan.publish("ticket:created", data, () => {
    console.log("Event published");
  });
});
