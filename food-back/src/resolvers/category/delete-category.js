import { categoryModel } from "../../models/category.js";

export const deleteCategory = async (req, res) => {
  const deletedCategory = await categoryModel.findByIdAndDelete(req.body.id); //id deer yu ch ogsn boldog!!!;
  res.status(201).json(deletedCategory);
};
