const { Users, Users_info } = require("../models");

class AuthRepository {
  createUser = async (usersData, users_InfoData) => {
    const createdUser = await Users.create(
      {
        id: usersData.id,
        nickname: usersData.nickname,
        password: usersData.password,
        Users_info: {
          email: users_InfoData.email,
          address: users_InfoData.address,
          sold_item: users_InfoData.sold_item,
          likes: users_InfoData.likes,
          bought_item: users_InfoData.bought_item,
        },
      },
      {
        include: [Users_info],
      }
    );
    return createdUser;
  };

  findOneUser = async (id) => {
    const findOneUserData = await Users.findOne({
      where: { id: id },
    });
    return findOneUserData;
  };

  findOneUsers_info = async (email) => {
    const findOneUserData = await Users_info.findOne({
      where: { email: email },
    });
    return findOneUserData;
  };

  findOneByUserId = async (user_id) => {
    const userInfo = await Users.findOne({
      where: { user_id },
    });
    return userInfo;
  };
}

module.exports = AuthRepository;
