import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    location: String,
  },
  {
    timestamps: true,
  },
);

export const Property = mongoose.model("Property", propertySchema);
