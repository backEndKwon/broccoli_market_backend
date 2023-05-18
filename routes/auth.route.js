const express = require('express');
const router = express.Router();

const authMiddleware = require("../middlewares/auth-middleware.js");
const AuthController = require('../controllers/auth.controller');
const authController = new AuthController();


// POST: 이메일 인증
router.post('/authEmail', authController.authEmail);

// POST: 소셜 로그인
router.post('/auth/kakao', authController.kakaoLogin)

// POST: 회원가입
router.post('/signup', authController.signup);

// POST: 로그인
router.post('/login', authController.login)

// DELETE: 로그아웃
router.delete('/:user_id/logout', authController.logout)

// DELETE: 회원 탈퇴
// router.delete('/', authController.deleteUser);

module.exports = router;