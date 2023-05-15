const jwt = require("jsonwebtoken");
const { Users } = require("../models");
const redisClient = require("../utils/redis.js");

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  const { authType, authToken } = (authorization ?? "").split(" ");
  if (authType !== "Bearer" || !authToken) {
    return res
      .status(403)
      .json({ errormessage: "로그인이 필요한 기능입니다." });
  }

  try {
    const decodedToken = jwt.verify(authToken, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const user = await Users.findOne({ where: { userId } });
    if (!user) {
      return res.status(401).json({
        errormessage: "토큰에 해당하는 사용자가 존재하지 않습니다.",
      });
    }
    res.locals.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      const refreshToken = req.cookies.refreshToken;
      const redisRefreshToken = await redisClient.get(user_id);

      if (refreshToken !== redisRefreshToken) {
        return res.status(401).json({
          errormessage: "토큰이 일치하지 않습니다. 다시 로그인해 주세요.",
        });
      }

      const decodedRefreshToken = jwt.verify(
        refreshToken,
        process.env.REFRESH_SECRET_KEY
      );
      const userId = decodedRefreshToken.userId;

      const user = await Users.findOne({ where: { user_id } });
      if (!user) {
        return res.status(401).json({
          errormessage: "리프레시 토큰에 해당하는 사용자가 존재하지 않습니다.",
        });
      }

      const newAccessToken = jwt.sign(
        { userId: user.userId },
        process.env.SECRET_KEY,
        { expiresIn: "2h" }
      );

      res.cookie("authorization", `Bearer ${newAccessToken}`, {
        httpOnly: true,
        secure: false,
      });
      res.locals.user = user;
      return next();
    } else {
      return res.status(403).json({
        errormessage: "전달된 쿠키에서 오류가 발생하였습니다.",
      });
    }
  }
};
