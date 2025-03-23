import { useState } from "react";
import UserManagement from "./UserManagement";
import TicketList from "./TicketList";

export default function AdminDashboard() {
  const [users, setUsers] = useState([
    { email: "engineer@example.com", role: "engineer" },
  ]);

  const [tickets, setTickets] = useState([
    { title: "Network Issue", description: "Fix Wi-Fi", status: "Open", assignedTo: null },
  ]);

  const assignTicket = (index, engineerEmail) => {
    setTickets(
      tickets.map((ticket, i) =>
        i === index ? { ...ticket, assignedTo: engineerEmail } : ticket
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>

      {/* User Management */}
      <UserManagement users={users} setUsers={setUsers} />

      {/* Ticket Management */}
      <div className="card p-3 mt-4">
        <h4>Manage Tickets</h4>
        {tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          tickets.map((ticket, index) => (
            <div key={index} className="border p-2 mb-2">
              <h5>{ticket.title}</h5>
              <p>{ticket.description}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              <p><strong>Assigned to:</strong> {ticket.assignedTo || "Not Assigned"}</p>

              {/* Assign to Engineer */}
              <select className="form-control mb-2"
                onChange={(e) => assignTicket(index, e.target.value)}
              >
                <option value="">Assign to Engineer</option>
                {users.filter(user => user.role === "engineer").map((user, i) => (
                  <option key={i} value={user.email}>{user.email}</option>
                ))}
              </select>
            </div>
          ))
        )}
      </div>
    </div>
  );
}