import { OrderModel } from "../../models/order-model.js";
import "../../models/user-model.js";
import "../../models/food-model.js";

export const getOrders = async (req, res) => {
  try {
    const getOrder = await OrderModel.find()
      .populate({ path: "user", select: "email name" })
      .populate({ path: "foodOrderItems.food" })
      .sort({ createdAt: -1 });
    res.status(200).json(getOrder);
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ message: "Захиалга авахад алдаа гарлаа" });
  }
};
