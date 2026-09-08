import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dns from "dns";
import "dotenv/config";

import { categoryRouter } from "./routes/category.js";
import { foodRouter } from "./routes/food.js";
import { orderRouter } from "./routes/order.js";
import { userRouter } from "./routes/user.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const app = express();

app.use(express.json());
app.use(cors());

app.use("/category", categoryRouter);
app.use("/food", foodRouter);
app.use("/order", orderRouter);
app.use("/user", userRouter);
await mongoose.connect(process.env.MONGODB_URI);
console.log("Connected ");
if (!process.env.VERCEL) {
  const port = 8000;
  app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
  });
}
export default app;
