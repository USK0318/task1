const jwt = require('jsonwebtoken');
const User = require('../models/teachers');

    const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Bearer token required" });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token not found" });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" });
        }

        const decodedId = decoded.userId;

        const userExists = await User.findById(decodedId);
        if (!userExists) {
            return res.status(401).json({ message: "User not found" });
        }
        next();
    } catch (error) {
        console.error("Authentication error:", error.message);
        return res.status(401).json({ message: "Invalid Token" });
    }
};

module.exports = authenticateToken;
