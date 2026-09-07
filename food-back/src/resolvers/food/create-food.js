import { foodModel } from "../../models/food-model.js";

export const createFood = async (req, res) => {
  const body = req.body;
  const newFood = await foodModel.create({
    foodName: body.foodName,
    price: body.price,
    image: body.image,
    ingredients: body.ingredients,
    category: body.category,
  });
  res.status(201).json({ message: "food amjillta uuslee", food: newFood });
};
