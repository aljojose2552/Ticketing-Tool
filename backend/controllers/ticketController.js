const { createTicket, getAllTickets, getTicketsByUser, updateTicketStatus } = require('../models/Ticket');
const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'secret';

// Create a ticket
const createTicketController = async (req, res) => {
  const { title, description, userId } = req.body;

  try {
    // Create the ticket in the database
    const result = await createTicket(title, description, userId);
    res.status(201).json({ message: 'Ticket created successfully!', ticketId: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating ticket' });
  }
};

// Get all tickets (for admin/engineer)
const getTicketsController = async (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const role = decoded.role;

    if (role === 'user') {
      const tickets = await getTicketsByUser(decoded.id);
      return res.json(tickets);
    }

    if (role === 'admin' || role === 'engineer') {
      const tickets = await getAllTickets();
      return res.json(tickets);
    }

    res.status(403).json({ message: 'Forbidden' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// Update ticket status (for engineer/admin)
const updateTicketStatusController = async (req, res) => {
  const { ticketId } = req.params;
  const { status, engineerId } = req.body;

  try {
    // Update the ticket status in the database
    await updateTicketStatus(ticketId, status, engineerId);
    res.json({ message: 'Ticket status updated' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating ticket status' });
  }
};

module.exports = {
  createTicketController,
  getTicketsController,
  updateTicketStatusController
};
