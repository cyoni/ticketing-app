import { Message, Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
export declare abstract class Listener<T extends {
    subject: Subjects;
    data: any;
}> {
    abstract subject: T["subject"];
    abstract queueGroupName: string;
    abstract onMessage(data: T["data"], msg: Message): void;
    private client;
    protected ackWait: number;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
    parseMessage(msg: Message): T;
}
