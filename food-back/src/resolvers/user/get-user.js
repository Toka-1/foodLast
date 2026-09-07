import { userModel } from "../../models/user-model.js";

export const getUser = async (req, res) => {
  const getUser = await userModel.find().populate("orderedFoods");
  res.status(200).json(getUser);
};
