require('dotenv').config()
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.AUTH_SECRETE_KEY;

const userAuth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).send({ error: "Please authenticate using a valid token" });
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next()

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
    }
}

module.exports = userAuth;