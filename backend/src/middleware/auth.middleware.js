const jwt=require("jsonwebtoken");


async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided"
            });
        }

        const blacklistedToken = await BlacklistToken.findOne({ token });

        if (blacklistedToken) {
            return res.status(401).json({
                message: "Invalid token"
            });
        }


        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // user data from token

        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
}

module.exports = authUser;