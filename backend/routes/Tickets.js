// routes/Tickets.js
const express = require('express');
const {
  createTicketController,
  getTicketsController,
  updateTicketStatusController
} = require('../controllers/ticketController');

const router = express.Router();

// Create a ticket
router.post('/create', createTicketController);

// Get all tickets (for admin/engineer)
router.get('/', getTicketsController);

// Update ticket status (for engineer/admin)
router.put('/:ticketId', updateTicketStatusController);

module.exports = router;
