import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    property: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Property",
    },
  },
  {
    timestamps: true,
  },
);

export const Favourite = mongoose.model("Favourite", favouriteSchema);
