import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import {
  getFavourites,
  addFavourite,
  removeFavourite,
} from "../controller/favourites.controller";

const router = express.Router();

router.get("/", authMiddleware, getFavourites);

router.post("/:id", authMiddleware, addFavourite);

router.delete("/:id", authMiddleware, removeFavourite);

export default router;
