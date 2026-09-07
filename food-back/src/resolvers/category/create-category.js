import { categoryModel } from "../../models/category.js";

export const createCategory = async (req, res) => {
  const body = req.body;
  const newCategory = await categoryModel.create({
    categoryName: body.categoryName,
  });
  res.status(201).json({ message: "amjillta", category: newCategory });
};
