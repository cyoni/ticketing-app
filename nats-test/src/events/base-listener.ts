import { Message, Stan } from "node-nats-streaming";

export abstract class Listener {
  abstract subject: string;
  abstract queueGroupName: string;
  abstract onMessage(data: any, msg: Message): void;
  private client: Stan;
  protected ackWait = 5000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return this.client
      .subscriptionOptions()
      .setManualAckMode(true)
      .setDeliverAllAvailable()
      .setAckWait(this.ackWait)
      .setDurableName(`${this.queueGroupName}-durable-name`);
  }

  listen() {
    const stan = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    stan.on("message", (msg: Message) => {
      console.log(`Received event: #${this.subject} / ${this.queueGroupName}`);

      const parsedMsg = this.parseMessage(msg);
      this.onMessage(parsedMsg, msg);
      // msg.ack();
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();
    return typeof data === "string" ? data : JSON.parse(data.toString("utf-8"));
  }
}
