import { Subjects, TicketCreatedEvent, Listener } from "@cyoni10/common";
import { Message } from "node-nats-streaming";
import { orderService } from "../../consts";
import { Ticket } from "../../models/ticket";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = orderService;

  async onMessage(data: TicketCreatedEvent["data"], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({ id, title, price });
    await ticket.save();
    msg.ack();
  }
}
