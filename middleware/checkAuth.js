const jwt = require('jsonwebtoken');

const checkAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization; 
    if (!authHeader) {
        res.status(403).json({
            success: false,
            message: "Protected route"
        });
        return;
    }
    const [tokenType, token] = authHeader.split(" ");
    if (tokenType === "Bearer") {
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, authData) => {
            if (err) {
                res.status(401).json({
                    success: false,
                    message: "Unauthorized to access this route"
                });
                return;
            }
            // continue to protected route passing the context of the token owner
            req.me = authData.email;
            next();
        });
    } else {
        res.status(400).json({
            success: false,
            message: "Bearer token missing"
        });
        return;
    }
}

module.exports = checkAuth;
