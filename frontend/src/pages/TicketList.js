export default function TicketList({ tickets, onUpdateStatus, onDelete }) {
    return (
      <div className="card p-3">
        <h4>Tickets</h4>
        {tickets.length === 0 ? (
          <p>No tickets available.</p>
        ) : (
          tickets.map((ticket, index) => (
            <div key={index} className="card mb-2 p-2">
              <h5>{ticket.title}</h5>
              <p>{ticket.description}</p>
              <p><strong>Status:</strong> {ticket.status}</p>
              {onUpdateStatus && (
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => onUpdateStatus(index)}
                >
                  Mark as {ticket.status === "Open" ? "In Progress" : "Resolved"}
                </button>
              )}
              {onDelete && (
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => onDelete(index)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    );
  }