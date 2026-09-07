import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../models/user-model.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email: email });
  console.log("user", user);

  if (!user) {
    return res
      .status(401)
      .json({ message: "Email эсвэл password буруу байна" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return res
      .status(401)
      .json({ message: "Email эсвэл password буруу байна" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email, role: user.role },
    "naba",
    { expiresIn: "7d" },
  );

  user.password = undefined;

  const payload = user.toObject ? user.toObject() : { ...user };
  if (!payload.name && payload.email) {
    payload.name = payload.email.split("@")[0];
  }

  res.json({ message: "Амжилттай нэвтэрлээ", token, user: payload });
};
