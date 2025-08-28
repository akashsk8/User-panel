
const jwt = require('jsonwebtoken')

const isLogin = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send('You need to login first');
    }

    try {
        const data = jwt.verify(token, process.env.Secret);
        req.user = data;
        next();
    } catch (err) {
        return res.status(401).send('Invalid or expired token');
    }
};


module.exports = isLogin;