import jwt from "jsonwebtoken";

export const authMiddleware = (req: any, res: any, next: any) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = header.split(" ")[1];

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  req.userId = decoded.userId;

  next();
};
