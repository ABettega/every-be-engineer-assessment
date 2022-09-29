const bcrypt = require('bcrypt');
const {
  createUserDal,
} = require('../dal/user.dal');

const createUserService = async ({
  username,
  password,
}) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);

    await createUserDal({
      username,
      securePassword,
    });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createUserService,
};
