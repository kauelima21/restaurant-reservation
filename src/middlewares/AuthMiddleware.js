import jsonwebtoken from "jsonwebtoken";

export class AuthMiddleware {
  static async handle(req, res, next, validRoles) {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [type, token] = authorization?.split(" ");

    if (!token || type !== "Bearer") {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      req.user = decoded;
      if (validRoles && !validRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.metadata = {
        ...req.metadata,
        user: { ...decoded },
      };

      next();
    } catch (error) {
      return res.status(401).json({ message: "Unauthorized" });
    }
  }
}
