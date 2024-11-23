import { Listener, Subjects, TicketUpdatedEvent } from "@cyoni10/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { orderService } from "../../consts";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName = orderService;

  async onMessage(data: TicketUpdatedEvent["data"], msg: Message) {
    const { id, title, price } = data;
    const ticket = await Ticket.findById(id);

    if (!ticket) {
      msg.ack();
      throw new Error("no ticket found");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
