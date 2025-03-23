import { useState } from "react";
import TicketList from "./TicketList";

export default function EngineerDashboard() {
  const [tickets, setTickets] = useState([
    { title: "Issue 1", description: "Fix printer", status: "Open" },
  ]);

  const updateTicketStatus = (index) => {
    setTickets(
      tickets.map((ticket, i) =>
        i === index
          ? { ...ticket, status: ticket.status === "Open" ? "In Progress" : "Resolved" }
          : ticket
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2>Engineer Dashboard</h2>
      <TicketList tickets={tickets} onUpdateStatus={updateTicketStatus} />
    </div>
  );
}