const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const token = req.header("authorization");
    if (!token) {
        return res.status(401).json({ error: "Access denied. Token missing." });
    }
    const finailtoken = token.split(" ")[1];
    try {
        const decoded = jwt.verify(finailtoken, "Ben10");
        req.user = decoded;
        console.log(decoded,"decoded");
        next();
    } catch (error) {
        return res.status(403).json({ error: "Invalid token." });
    }
}

module.exports = { authenticateToken };
