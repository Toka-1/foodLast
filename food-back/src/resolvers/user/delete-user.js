import { userModel } from "../../models/user-model.js";

export const deleteUser = async (req, res) => {
  const deletedUser = await userModel.findByIdAndDelete(req.body.id); //id deer yu ch ogsn boldog!!!;
  res.status(201).json(deletedUser);
};
