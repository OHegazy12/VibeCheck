const jwt = require("jsonwebtoken");


exports.cookieJwtAuth = (req, res, next) => {
    // console.log("yeet")
    const token = req.cookies.token;
    // console.log(token)
    // console.log(req.cookies)
    try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
        req.user = user;
        next();
    } catch (err) {
        res.clearCookie('token');
    }
};