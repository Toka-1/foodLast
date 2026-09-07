import { foodModel } from "../../models/food-model.js";

export const getFoodByCategory = async (req, res) => {
  try {
    const foods = await foodModel.find({
      category: req.params.categoryId,
    });

    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({
      message: "Category-ийн food авахад алдаа гарлаа",
      error: error.message,
    });
  }
};