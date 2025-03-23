import { useState } from "react";
import TicketForm from "./TicketForm";
import TicketList from "./TicketList";

export default function UserDashboard() {
  const [tickets, setTickets] = useState([]);

  const addTicket = (ticket) => {
    setTickets([...tickets, ticket]);
  };

  const deleteTicket = (index) => {
    setTickets(tickets.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-4">
      <h2>User Dashboard</h2>
      <TicketForm onSubmit={addTicket} />
      <TicketList tickets={tickets} onDelete={deleteTicket} />
    </div>
  );
}