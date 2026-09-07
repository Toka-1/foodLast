import { OrderModel } from "../../models/order-model.js";

export const deleteOrder = async (req, res) => {
  const deletedOrder = await OrderModel.findByIdAndDelete(req.body.id); //id deer yu ch ogsn boldog!!!;
  res.status(201).json(deletedOrder);
};
