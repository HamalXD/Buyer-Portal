import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRoutes from "./routes/auth.routes";
import favouriteRoutes from "./routes/favourites.routes";
import propertyRoutes from "./routes/property.routes";
import { errorHandler } from "./middleware/error.middleware";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: [
      "https://techkraftbuyerportal.vercel.app/",
      "http://localhost:3000",
    ],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  }),
);
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("API running");
});

app.use("/auth", authRoutes);
app.use("/favourites", favouriteRoutes);
app.use("/properties", propertyRoutes);

connectDB();

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on ${PORT}`);
});

app.use(errorHandler);
