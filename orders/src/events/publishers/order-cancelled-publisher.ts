import { Publisher, Subjects, OrderCancelledEvent } from "@cyoni10/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
