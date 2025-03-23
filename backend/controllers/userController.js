// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { createUser, findUserByEmail } = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'secret';

// User registration
const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, email, password, role } = req.body;

  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    await createUser(first_name, last_name, email, hashPassword, role);
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Error during user registration:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

// User login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user.id, role: user.role };

    try {
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
      res.json({ token });
    } catch (err) {
      console.error('Error signing JWT:', err);
      res.status(500).json({ message: 'Error creating authentication token' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Something went wrong.' });
  }
};

module.exports = { registerUser, loginUser };
