const AuthService = require('../services/auth.service');
const nodemailer = require("nodemailer");
const path = require('path');
const ejs = require('ejs');
const Axios = require('axios');
const appDir = path.dirname(require.main.filename);
const redisClient = require('../utils/redis.js')
require("dotenv").config();

class AuthController {
    authService = new AuthService();

    kakaoLogin = async (req, res) => {
      const code = req.query.code;
      console.log(code)
      try { 
          // Access token 가져오기
          const res1 = await Axios.post('https://kauth.kakao.com/oauth/token', {}, {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
              },
              params:{
                  grant_type: 'authorization_code',
                  client_id: process.env.KAKAO_SECRET_KEY,
                  code: code,
                  redirect_uri: "http://api.broccoli-market.store/api/auth/kakaoLogin" // 로컬 테스트 시 'http:://백엔드 포트/api/auth/kakaoLogin
              }
          });
          
          // Access token을 이용해 정보 가져오기
          const res2 = await Axios.post('https://kapi.kakao.com/v2/user/me', {}, {
              headers: {
                  "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
                  'Authorization': 'Bearer ' + res1.data.access_token
              }
          });
  
          const data = res2.data;
          const user = await this.authService.findOneUsers_info(data.kakao_account.email)

          console.log(res2.data)
          if (!user) {
              res.redirect('http://broccoli-market.store/signup'); // 로컬 테스트 시 'http:://프론트 포트/signup'
              return;
          } else {
            
            const userData = await this.authService.kakaoLogin(data.kakao_account.email);

            res.cookie(
              "authorization",
              `${userData.accessObject.type} ${userData.accessObject.token}`
            );
      
            res.cookie(
              "refreshToken",
              `${userData.refreshObject.type} ${userData.refreshObject.token}`
               );
            

            res.status(200).redirect('http://broccoli-market.store') // 로컬 테스트 시 'http:://프론트 포트'

          }
      } catch (error) {
          console.error(error);
          res.status(400).json({errorMessage : '로그인에 실패했습니다.'});
      }
    };    
    
    authEmail = async (req, res) => {
      const { email } = req.body;
      const emailFilter = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
      let authNum = Math.random().toString().substr(2, 6);
      
      try {
        const emailTemplate = await ejs.renderFile(appDir + '/template/authMail.ejs', { authCode: authNum });
        const redisSetResult = await redisClient.SETEX(email, 300, authNum )
        const existsEmail = await this.authService.findOneUsers_info(email);

        const transporter = nodemailer.createTransport({
          service: "naver",
          port: 587,
          secure: false,
          auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
          },
        });
        
        if (existsEmail) {
          res.status(412).json({
            errorMessage: "중복된 이메일입니다.",
          });
          return;
        }

        const emailForm = {
          from: process.env.NODEMAILER_USER,
          to: email,
          subject: "전송받은 인증번호를 입력해주세요.",
          html: emailTemplate,
        };

        if (existsEmail) {
          res.status(412).json({
            errorMessage: "중복된 이메일입니다.",
          });
          return;
        }
  
        if (!emailFilter) {
          res.status(412).json({
            errorMessage: "이메일 형식이 일치하지 않습니다.",
          });
          return;
        }
  
        await transporter.sendMail(emailForm);
        res.status(200).json({
          message: `${email}주소로 인증 메일을 보냈습니다.`,
        });
      } catch (err) {
        console.error(err);
        res
          .status(400)
          .json({ errorMessage: "인증 이메일 전송에 실패하였습니다." });
      }
    };
    
    signup = async (req, res) => {
        const {id, nickname, password, email, address, authCode } = req.body;
        const redisGetResult = await redisClient.get(email)
        
        try {
          const existsId = await this.authService.findOneUser(id);
          const existsUsers = await this.authService.findOneUser(nickname);
          const idFilter = /^[A-Za-z0-9]{3,}$/.test(id);
          const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
          const emailFilter = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(email);
    
        if (authCode !== redisGetResult) {
            return res.status(400).json({
               errorMessage: "인증코드가 일치하지 않습니다"
            });
         }

          if (existsUsers) {
            res.status(412).json({
              errorMessage: "중복된 닉네임입니다.",
            });
            return;
          }

          if (existsId) {
            res.status(412).json({
              errorMessage: "중복된 아이디입니다.",
            });
            return;
          }

          if (!idFilter) {
            res.status(412).json({
              errorMessage: "아이디의 형식이 일치하지 않습니다.",
            });
            return;
          }
    
          if (!nicknameFilter) {
            res.status(412).json({
              errorMessage: "닉네임의 형식이 일치하지 않습니다.",
            });
            return;
          }
    
          if (!emailFilter) {
            res.status(412).json({
              errorMessage: "이메일의 형식이 일치하지 않습니다.",
            });
            return;
          }
    
          if (password.length < 4) {
            res.status(412).json({
              errorMessage: "패스워드 형식이 일치하지 않습니다.",
            });
            return;
          }
    
          if (password.includes(nickname) || password.includes(id)) {
            res.status(412).json({
              errorMessage: "패스워드에 닉네임 혹은 아이디가 포함되어 있습니다.",
            });
            return;
          }
          const signupData = await this.authService.signup(
            id,
            nickname,
            password,
            email,
            address
          );
    
          res.status(200).json(signupData);
        } catch (err) {
          console.error(err);
          res.status(400).json({
            errorMessage: "요청한 데이터 형식이 올바르지 않습니다.",
          });
        }
      };

      login = async (req, res) => {
        const { id, password } = req.body;
        const user = await this.authService.findOneUser(id);
        
        try {
          if (!user || password !== user.password) {
            res.status(412).json({
              errorMessage: "아이디 또는 패스워드를 확인해주세요.",
            });
            return;
          }
    
          const userData = await this.authService.login(id);
    
          res.cookie(
            "authorization",
            `${userData.accessObject.type} ${userData.accessObject.token}`
          );
    
          res.cookie(
            "refreshToken",
            `${userData.refreshObject.type} ${userData.refreshObject.token}`
             );

          res.status(200).json({
            authorization: `${userData.accessObject.type} ${userData.accessObject.token}`,
            refreshToken: `${userData.refreshObject.type} ${userData.refreshObject.token}`,
          });

        } catch (err) {
          console.error("로그인 에러 로그", err);
          res.status(400).json({
            errorMessage: "로그인에 실패하였습니다.",
          });
        }
      };
    
      logout = async (req, res) => {
        const { user_id } = req.params;
    
        try {
          const logoutData = await this.authService.logout(user_id);
          res.clearCookie("authorization", "refreshToken");
          delete res.locals.user;
          res.status(200).json(logoutData);
        } catch (err) {
          console.error(err);
          res.status(400).json({ errorMessage: "로그아웃에 실패하였습니다." });
        }
      };

};

module.exports = AuthController;
