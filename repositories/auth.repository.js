const { Users } = require('../models');

class AuthRepository {
  createUser = async (id, nickname, password, email, adress) => {
    const createUserData = await Users.create({
      id,
      nickname,
      password,
      email,
      adress
    });
    return createUserData;
  };

  findOneUser = async (id) => {
    const findOneUserData = await Users.findOne({
      where: { id: id },
    });
    return findOneUserData;
  };

  findOneByUserId = async (user_id) => {
    const userInfo= await Users.findOne({
      where: { user_id },
    });
    return userInfo
  };
}

module.exports = AuthRepository;