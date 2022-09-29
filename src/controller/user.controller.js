const { auditLog } = require('../util/logger');
const {
  createUserService,
} = require('../service/user.service');

/**
 * @param {string} username - The username for the user being created
 * @param {string} password - The password for the user being created
 *
 * @description
 * Creates a new user in the database. The password will be encrypted.
 *
 * @returns {String} A message confirming the creation of the user.
 */
const createUser = async (req, res) => {
  try {
    const {
      username,
      password,
    } = req.body;

    if (
      !username
      || !password
    ) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing',
      });
      return;
    }

    await createUserService({ username, password });

    auditLog({
      message: `User ${username} created successfully!`,
      location: 'POST /v1/user',
      severity: 'INFO',
    });

    res.status(200).json(`User ${username} created successfully!`);
  } catch (error) {
    auditLog({
      message: error.message,
      location: 'POST /v1/user',
      severity: 'ERROR',
    });
    res.status(400).json(error);
  }
};

module.exports = {
  createUser,
};
