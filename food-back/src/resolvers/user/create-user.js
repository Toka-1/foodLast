import bcrypt from "bcrypt";
import { userModel } from "../../models/user-model.js";

export const createUser = async (req, res) => {
  const body = req.body;
  const hashedPassword = await bcrypt.hash(body.password, 10);

  const email = body.email?.trim() || "";
  const name =
    body.name?.trim() || (email.includes("@") ? email.split("@")[0] : email);

  const newUser = await userModel.create({
    name,
    email,
    phoneNumber: body.phone || body.phoneNumber,
    password: hashedPassword,
    role: body.role,
    address: body.address,
  });

  res.status(201).json({
    message: "amjilltai hereglegch vvslee",
    user: newUser,
  });
};
