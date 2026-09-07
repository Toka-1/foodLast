import { OrderModel } from "../../models/order-model.js";
import "../../models/user-model.js";

export const updateOrder = async (req, res) => {
  try {
    const { id, status } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Order id шаардлагатай" });
    }

    const allowed = ["PENDING", "CANCELED", "DELIVERED"];
    if (status && !allowed.includes(status)) {
      return res.status(400).json({
        message: "Status нь PENDING, DELIVERED эсвэл CANCELED байх ёстой",
      });
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      {
        ...(status ? { status } : {}),
        updatedAt: new Date(),
      },
      { new: true },
    ).populate([
      { path: "user", select: "email name" },
      { path: "foodOrderItems.food", select: "foodName image price" },
    ]);

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order олдсонгүй" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Update order error:", error);
    res.status(500).json({ message: "Захиалга шинэчлэхэд алдаа гарлаа" });
  }
};
