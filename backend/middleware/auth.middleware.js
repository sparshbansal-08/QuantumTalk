import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        // Get token from cookie or Authorization header
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "You are not authenticated" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({ error: "Unauthorized User" });
    }
};
