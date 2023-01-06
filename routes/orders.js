import express from "express";
import { updateOrder, deleteOrder, getOrder, getOrders, createOrder } from "../controllers/Order.js";
import { verifyToken, verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/", createOrder);

//UPDATE

router.put("/:id", verifyUser, updateOrder);

//DELETE

router.delete("/:id", verifyUser, deleteOrder);

//GET

router.get("/:id", getOrder);

//GET ALL

router.get("/", getOrders);

export default router;