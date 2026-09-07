import { foodModel } from "../../models/food-model.js";

export const deleteFood = async (req, res) => {
  const deletedFood = await foodModel.findByIdAndDelete(req.body.id); //id deer yu ch ogsn boldog!!!;
  res.status(201).json(deletedFood);
};
