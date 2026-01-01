// Cravely / Server / middlewares / auth.js
import jwt from "jsonwebtoken";

/*-------- Authentication middleware --------*/
const authMiddleware = async (req, res, next) => {
  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized!",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = { _id: decoded.id, email: decoded.email };

    next();
  } catch (error) {
    console.error("Authentication middleware Error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Invalid or expired token",
      error: `Authentication middleware Error: ${error.message}`,
    });
  }
};

export default authMiddleware;
