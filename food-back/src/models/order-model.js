import mongoose from "mongoose";

const Schema = mongoose.Schema;

const foodOrderItem = new Schema({
  food: { type: Schema.ObjectId, ref: "food" },
  quantity: Number,
});

const OrderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  customerName: { type: String, default: "" },
  customerEmail: { type: String, default: "" },
  totalPrice: Number,
  foodOrderItems: [foodOrderItem],
  address: { type: String, default: "" },
  status: {
    type: String,
    enum: ["PENDING", "CANCELED", "DELIVERED"],
    default: "PENDING",
  },

  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const OrderModel = mongoose.model("order", OrderSchema);
