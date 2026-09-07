import { foodModel } from "../../models/food-model.js";

export const updatedFood = async (req, res) => {
  const body = req.body;
  const updatedFood = await foodModel.findByIdAndUpdate(body.id, {
    foodName: body.foodName,
    price: body.price,
    image: body.image,
    ingredients: body.ingredients,
    category:body.category
  });
  res.status(201).json(updatedFood);
};
