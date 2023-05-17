const jwt = require("jsonwebtoken");
const { Users } = require("../models/mysql");
const redisClient = require("../utils/redis.js");

module.exports = async (req, res, next) => {
  const { authorization } = req.cookies;
  const [authType, authToken] = (authorization ?? "").split(" ");

  try {
    if (authType !== "Bearer" || !authToken) {
      console.log("에러메세지: 로그인이 필요한 기능입니다.");
      return res
        .status(403)
        .json({ errormessage: "로그인이 필요한 기능입니다." });
    }
    const decodedToken = jwt.verify(authToken, process.env.SECRET_KEY);
    const user_id = decodedToken.user_id;

    const user = await Users.findOne({ where: { user_id } });
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
      const token = refreshToken.split(" ")[1];
      const decodedRefreshToken = jwt.verify(
        token,
        process.env.REFRESH_SECRET_KEY
      );
      const user_id = decodedRefreshToken.user_id;

      const user = await Users.findOne({ where: { user_id } });

      if (!user) {
        return res.status(401).json({
          errormessage: "리프레시 토큰에 해당하는 사용자가 존재하지 않습니다.",
        });
      }

      const newAccessToken = jwt.sign(
        { user_id: user.user_id },
        process.env.SECRET_KEY,
        {
          expiresIn: process.env.ACCESS_EXPIRES,
        }
      );

      res.cookie("authorization", `Bearer ${newAccessToken}`);
      res.locals.user = user;
      return next();
    } else {
      console.log("에러메세지: 전달된 쿠키에서 오류가 발생하였습니다.");

      return res.status(403).json({
        errormessage: "전달된 쿠키에서 오류가 발생하였습니다.",
      });
    }
  }
};
