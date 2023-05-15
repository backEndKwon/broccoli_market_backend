const { Users } = require('../models');
const { Users_info } = require('../models')

class AuthRepository {
  createUser = async (id, nickname, password, email, address) => {
    const createdUser = 
    await Users.create({
      id,
      nickname,
      password,
    });

    await Users_info.create({
      user_id: createdUser.user_id,
      email,
      address,
      sold_item: '',
      likes: '',
      bought_item: ''
    });
    return createdUser;
  };

  findOneUser = async (id) => {
    const findOneUserData = await Users.findOne({
      where: { id: id },
    });
    return findOneUserData;
  };

  findOneByUserId = async (user_id) => {
    const userInfo = await Users.findOne({
      where: { user_id },
    });
    return userInfo;
  };

  findUserInfoByUserId = async (user_id) => {
    const userInfo = await Users.findOne({
      where: { user_id },
      attributes: ["nickname", "address"],
    });
    return userInfo;
  };
}

module.exports = AuthRepository;
