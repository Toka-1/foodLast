import jwt from "jsonwebtoken";
import { OrderModel } from "../../models/order-model.js";
import { userModel } from "../../models/user-model.js";

const resolveUserId = (req) => {
  const fromBody = req.body?.user || req.body?.userId;
  if (fromBody) return String(fromBody);

  const authHeader = req.headers?.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, "naba");
    return decoded?.userId ? String(decoded.userId) : null;
  } catch {
    return null;
  }
};

export const createOrder = async (req, res) => {
  try {
    const body = req.body;
    const userId = resolveUserId(req);

    if (!userId) {
      return res
        .status(401)
        .json({ message: "Захиалга хийхийн тулд нэвтэрсэн байх ёстой" });
    }

    const foundUser = await userModel.findById(userId).select("email name");
    if (!foundUser) {
      return res.status(400).json({ message: "Хэрэглэгч олдсонгүй" });
    }

    const customerEmail = foundUser.email || "";
    const customerName =
      foundUser.name?.trim() ||
      (customerEmail.includes("@")
        ? customerEmail.split("@")[0]
        : customerEmail) ||
      "";

    const newOrder = await OrderModel.create({
      user: userId,
      customerName,
      customerEmail,
      totalPrice: body.totalPrice,
      foodOrderItems: body.foodOrderItems,
      address: body.address || "",
      status: body.status || "PENDING",
    });

    const populatedOrder = await OrderModel.findById(newOrder._id)
      .populate({ path: "user", select: "email name" })
      .populate({ path: "foodOrderItems.food", select: "foodName image price" });

    return res
      .status(201)
      .json({ message: "Захиалга амжилттай үүслээ", order: populatedOrder });
  } catch (error) {
    console.error("Create Order Error:", error);
    return res
      .status(500)
      .json({ message: error.message || "Серверт алдаа гарлаа" });
  }
};
