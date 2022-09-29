const sql = require('./database');

const createUserDal = async ({
  username,
  securePassword,
}) => {
  try {
    await sql`
      INSERT INTO users
      (
        username, password
      )
      VALUES
      (
        ${username}, ${securePassword}
      )
    `;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUserDal,
};
