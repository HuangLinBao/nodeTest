const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (e) {
        return res.status(400).send("Invalid Credentials");
    }
}