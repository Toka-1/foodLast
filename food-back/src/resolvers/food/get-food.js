import { foodModel } from "../../models/food-model.js";

export const getFood = async (req, res) => {
  const getFood = await foodModel.find().populate("category");
  res.status(200).json(getFood);
};
