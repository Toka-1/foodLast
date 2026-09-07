import express from "express";
import { getCategory } from "../resolvers/category/get-category.js";
import { createCategory } from "../resolvers/category/create-category.js";
import { deleteCategory } from "../resolvers/category/delete-category.js";
import { updateCategory } from "../resolvers/category/update-category.js";
import { getFoodByCategory } from "../resolvers/food/getFood-By-Category.js";

export const categoryRouter = express.Router();
categoryRouter.get("/", getCategory);
categoryRouter.post("/", createCategory);
categoryRouter.delete("/", deleteCategory);
categoryRouter.put("/", updateCategory);
categoryRouter.get("/:categoryId", getFoodByCategory);