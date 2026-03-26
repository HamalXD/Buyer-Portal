import express from "express";
import { authMiddleware } from "../middleware/auth.middleware";
import { getProperties } from "../controller/property.controller";

const router = express.Router();

router.get("/", authMiddleware, getProperties);

export default router;
