// routes/user.js
const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser } = require('../controllers/userController');
const router = express.Router();

// User registration route
router.post(
  '/register',
  [
    check('first_name').not().isEmpty().withMessage('First name is required'),
    check('last_name').not().isEmpty().withMessage('Last name is required'),
    check('email').isEmail().withMessage('Email is required and should be valid'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('role').isIn(['user', 'admin', 'engineer']).withMessage('Role must be valid')
  ],
  registerUser
);

// User login route
router.post('/login', loginUser);

module.exports = router;
