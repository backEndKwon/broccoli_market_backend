const jwt = require("jsonwebtoken")
const {Users} = require("../models");

module.exports = async (req, res, next) => {
    
    const {authorization} = req.cookies;
    const {authType, authToken} = (authorization ?? "").split(" ");;
    if(authType !== "Bearer" || !authToken){
        return res.status(403).json({ errormessage : "로그인이 필요한 기능입니다."})
    }

    try {
        const decodedToken = jwt.verify(authToken, "secretkeywhatever");
        const userId = decodedToken.userId;

        const user = await Users.findOne({ where: { userId }});
        if(!user) {
            return res.status(401).json({
                errormessage : "토큰에 해당하는 사용자가 존재하지 않습니다."
            })
        }
        res.locals.user = user;
        next();
    } catch (error){
        return res.status(403).json({
            errormessage : "전달된 쿠키에서 오류가 발생하였습니다."
        })
    }
}