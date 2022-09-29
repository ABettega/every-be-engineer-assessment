// Imports
const express = require('express');

// Controller
const {
  createUser,
} = require('../controller/user.controller');

// Router
const router = express.Router();

// Routes
router.post('/', (req, res) => createUser(req, res));

module.exports = router;
