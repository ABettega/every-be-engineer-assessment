// Imports
const express = require('express');
const { securityCheck } = require('../util/security');

// Controller
const {
  listTasks,
  createTask,
  updateTaskStatus,
} = require('../controller/task.controller');

// Router
const router = express.Router();

// Routes
router.get('/', securityCheck, (req, res) => listTasks(req, res));
router.post('/', securityCheck, (req, res) => createTask(req, res));
router.put('/', securityCheck, (req, res) => updateTaskStatus(req, res));

module.exports = router;
