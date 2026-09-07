import { categoryModel } from "../../models/category.js";

export const updateCategory = async (req, res) => {
  const body = req.body;
  const updatedCategory = await categoryModel.findByIdAndUpdate(body.id, {
    categoryName: body.categoryName,
  });
  res.status(201).json(updatedCategory);
};
