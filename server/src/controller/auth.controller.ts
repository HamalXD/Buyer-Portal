import { User } from "../models/User";
import { hashPassword, comparePassword } from "../utils/hash";
import { generateToken } from "../utils/jwt";

export const register = async (req: any, res: any, next: any) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({ message: "Email already Exists" });
    }

    const hashed = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashed,
    });

    res.json({
      id: user._id,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: any, res: any, next: any) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ messaage: "Invlaid credentials" });
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Invlaid credentials" });
    }

    const token = generateToken(user._id.toString());

    res.json({
      token,
      name: user.name,
      role: user.role,
    });
  } catch (error) {
    next(error);
  }
};
