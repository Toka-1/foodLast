import { userModel } from "../../models/user-model.js";

export const updateUser = async (req, res) => {
  const body = req.body;
  const updatedUser = await userModel.findByIdAndUpdate(body.id, {
    totalPrice: body.totalPrice,
    foodOrderItems: body.foodOrderItems,
  });
  res.status(201).json(updatedUser);
};
