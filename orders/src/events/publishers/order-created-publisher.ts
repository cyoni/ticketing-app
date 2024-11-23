import { Publisher, OrderCreatedEvent, Subjects } from "@cyoni10/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
