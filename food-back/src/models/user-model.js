import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },

  orderedFoods: [
    {
      type: Schema.Types.ObjectId,
      ref: "food",
    },
  ],
  ttl: Date,
  isVerified: {
    type: Boolean,
    default: false,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
});

export const userModel = mongoose.model("user", UserSchema);
