// models/Ticket.js
const pool = require('../config/db'); // MySQL connection

// Create a new ticket
const createTicket = async (title, description, userId) => {
  try {
    const [result] = await pool.execute(
      'INSERT INTO tickets (title, description, user_id) VALUES (?, ?, ?)',
      [title, description, userId]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Get all tickets
const getAllTickets = async () => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets');
    return rows;
  } catch (error) {
    throw error;
  }
};

// Get tickets for a specific user
const getTicketsByUser = async (userId) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE user_id = ?', [userId]);
    return rows;
  } catch (error) {
    throw error;
  }
};

// Update a ticket's status
const updateTicketStatus = async (ticketId, status, engineerId) => {
  try {
    const [result] = await pool.execute(
      'UPDATE tickets SET status = ?, engineer_id = ? WHERE id = ?',
      [status, engineerId, ticketId]
    );
    return result;
  } catch (error) {
    throw error;
  }
};

// Get a single ticket by its ID
const getTicketById = async (ticketId) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM tickets WHERE id = ?', [ticketId]);
    return rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createTicket,
  getAllTickets,
  getTicketsByUser,
  updateTicketStatus,
  getTicketById
};
