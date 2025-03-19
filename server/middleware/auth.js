
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
    let token = req.headers["authorization"];

    if (!token) {
        return res.status(400).json({ message: "Unauthorized" });
    }

    token = token.split(" ")[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(400).json({ message: "Unauthorized" }); 
        }
        console.log(decoded);
        req.user = decoded;
        next(); // 
    });
};

module.exports = verifyToken;
