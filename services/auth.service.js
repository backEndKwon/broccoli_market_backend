const AuthRepository = require('../repositories/auth.repository');
const { Users } = require("../models");
const redisClient = require("../utils/redis");
const jwt = require("jsonwebtoken");
require("dotenv").config();


class AuthService {
  constructor(authRepository) {
    this.redisClient = redisClient;
  }
  authRepository = new AuthRepository(Users);
  
  signup = async (id, nickname, password, email, address) => {
    const usersData = { id, password, nickname };
    const users_InfoData = { email, address, sold_item: "", likes: "", bought_item: "" };
  
    await this.authRepository.createUser(usersData, users_InfoData);
    
    return { message: "회원 가입 완료" };
  };

  login = async (id) => {
    const user = await this.authRepository.findOneUser(id);
    const accessToken = jwt.sign(
      { nickname: user.nickname },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshToken = jwt.sign(
      { nickname: user.nickname },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_EXPIRES,
      }
    );
    const refreshObject = {type: "Bearer", token: refreshToken}

    return { accessObject, refreshObject }; 

  };

  kakaoLogin = async (email) => {
    const user = await this.authRepository.socialFindOneUser(email);
    const accessToken = jwt.sign(
      { nickname: user.nickname },
      process.env.SECRET_KEY,
      {
        expiresIn: process.env.ACCESS_EXPIRES,
      }
    );
    const accessObject = { type: "Bearer", token: accessToken };

    const refreshToken = jwt.sign(
      { nickname: user.nickname },
      process.env.REFRESH_SECRET_KEY,
      {
        expiresIn: process.env.REFRESH_EXPIRES,
      }
    );
    const refreshObject = {type: "Bearer", token: refreshToken}

    return { accessObject, refreshObject }; 

  };

  findOneUser = async (id) => {
    const findOneUserData = this.authRepository.findOneUser(id);
    return findOneUserData;
  };

  socialFindOneUser = async (email) => {
    const socialFindOneUserData = this.authRepository.socialFindOneUser(email);
    return socialFindOneUserData;
  };

  logout = async (user_id) => {
    await this.redisClient.del(user_id.toString());
    return { message: "로그아웃 되었습니다." };
  };
}

module.exports = AuthService;