const express = require('express');
const cors = require('cors');
const usersRouter = require('./routes/Users');
const ticketsRouter = require('./routes/Tickets');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/users', usersRouter);
app.use('/tickets', ticketsRouter);

// Root route for health check (optional but recommended for API health check)
app.get('/', (req, res) => {
  res.status(200).send("API is working");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error for debugging
  res.status(500).json({ message: 'Something went wrong on the server!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
