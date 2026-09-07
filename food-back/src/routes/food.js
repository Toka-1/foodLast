import express from "express";
import { getFood } from "../resolvers/food/get-food.js";
import { createFood } from "../resolvers/food/create-food.js";
import { deleteFood } from "../resolvers/food/delete-food.js";
import { updatedFood } from "../resolvers/food/update-food.js";

export const foodRouter = express.Router();
foodRouter.get("/", getFood);
foodRouter.post("/", createFood);
foodRouter.delete("/", deleteFood);
foodRouter.put("/", updatedFood);
