const { auditLog } = require('../util/logger');
const {
  listTasksService,
  createTaskService,
  updateTaskStatusService,
} = require('../service/task.service');

/**
 * @param {string} username - The username for the user attempting to list the tasks
 * @param {string} password - The password for the user attempting to list the tasks
 *
 * @description
 * Lists all tasks existing in the system. Will only return a valid list
 * if the user passes a valid username / password combination in the headers.
 *
 * @returns {String[]} The existing list of tasks.
 */
const listTasks = async (req, res) => {
  try {
    const { username } = req.headers;

    const taskList = await listTasksService();

    auditLog({
      message: `User ${username} has listed all tasks.`,
      location: 'GET /v1/task',
      severity: 'INFO',
    });
    res.status(200).json(taskList);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'GET /v1/task',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} username - The username for the user attempting to create the task
 * @param {string} password - The password for the user attempting to create the task
 * @param {string} title - The desired title for the task
 * @param {string} description - The description for the task
 * @param {(1|2|3|4)} statusId - The status ID for the task.
 * Allowed values: 1 - To Do; 2 - In Progress; 3 - Done; 4 - Archived;
 *
 * @description
 * Creates a new task based on the title, description and status ID parameters.
 *
 * @returns {String} A message confirming the task creation.
 */
const createTask = async (req, res) => {
  try {
    const { username } = req.headers;
    const {
      title,
      description,
      statusId,
    } = req.body;

    if (
      !title
      || !description
      || !statusId
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing',
      });
      return;
    }

    const taskCreationResult = await createTaskService({ title, description, statusId });

    if (taskCreationResult.success) {
      auditLog({
        message: `User ${username} has created a new task, titled ${title}!`,
        location: 'POST /v1/task',
        severity: 'INFO',
      });
      res.status(200).json('Task inserted successfully!');
    } else {
      auditLog({
        message: `User ${username} tried to create a new task, but failed! Error: ${taskCreationResult.message}`,
        location: 'POST /v1/task',
        severity: 'WARN',
      });
      res.status(400).json(taskCreationResult.message);
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'POST /v1/task',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

/**
 * @param {string} username - The username for the user attempting to update the task
 * @param {string} password - The password for the user attempting to update the task
 * @param {number} taskId - The ID for the task being updated
 * @param {(1|2|3|4)} statusId - The new status ID for the task.
 * Allowed values: 1 - To Do; 2 - In Progress; 3 - Done; 4 - Archived;
 *
 * @description
 * Updates an existing task based on the ID, to another status, also based on ID.
 *
 * @returns {String} A message confirming the task update.
 */
const updateTaskStatus = async (req, res) => {
  try {
    const { username } = req.headers;
    const {
      taskId,
      statusId,
    } = req.body;

    if (
      !taskId
      || !statusId
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing',
      });
      return;
    }

    const taskUpdateResult = await updateTaskStatusService({ taskId, statusId });

    if (taskUpdateResult.success) {
      auditLog({
        message: `User ${username} has updated task ${taskId} to status ${statusId}!`,
        location: 'PUT /v1/task',
        severity: 'INFO',
      });
      res.status(200).json(taskUpdateResult.message);
    } else {
      auditLog({
        message: `User ${username} tried to update task ${taskId}, but failed! Error: ${taskUpdateResult.message}`,
        location: 'POST /v1/task',
        severity: 'WARN',
      });
      res.status(400).json(taskUpdateResult.message);
    }
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'PUT /v1/task',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  listTasks,
  createTask,
  updateTaskStatus,
};
