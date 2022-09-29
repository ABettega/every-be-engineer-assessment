const bcrypt = require('bcrypt');
const sql = require('../dal/database');

const securityCheck = async (req, res, next) => {
  try {
    const {
      username,
      password,
    } = req.headers;

    if (!username || !password) {
      res.status(400).json({
        message: 'Malformed request - Parameter(s) missing',
      });
      return;
    }

    const userResult = await sql`
      SELECT *
      FROM users
      WHERE username = ${username};
    `;

    if (!userResult.length) {
      res.status(401).json({
        message: 'Incorrect username or password.',
      });
      return;
    }

    const userPassword = userResult[0].password;

    const validPassword = await bcrypt.compare(password, userPassword);

    if (validPassword) {
      next();
    } else {
      res.status(401).json({
        message: 'Incorrect username or password.',
      });
    }
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  securityCheck,
};
