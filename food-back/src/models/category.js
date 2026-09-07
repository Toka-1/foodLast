import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const CategorySchema = new Schema({
  id: ObjectId,
  categoryName: String,

  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});
export const categoryModel = mongoose.model("category", CategorySchema);
