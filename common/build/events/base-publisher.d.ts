import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";
export declare abstract class Publisher<T extends {
    subject: Subjects;
    data: any;
}> {
    abstract subject: T["subject"];
    private client;
    constructor(client: Stan);
    publish(data: T["data"]): Promise<void>;
}
