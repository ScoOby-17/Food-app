import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {
    const token = req.headers.token;

    if (!token) {
        return res.json({
            success: false,
            message: "Not authorized, login again"
        });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRRT);

        req.body.userId = token_decode.id;

        next();

    } catch (error) {
        return res.json({
            success: false,
            message: "Invalid Token"
        });
    }
}

export default authMiddleware