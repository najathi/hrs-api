import Order from "../models/Order.js";
import { createError } from "../utils/error.js";

export const createOrder = async (req, res, next) => {
    try {
        const newOrder = new Order({
            ...req.body,
        })
        await newOrder.save();
        res.status(200).send("Order has been created.")
    } catch (error) {
        next(error);
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const updateOrder = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updateOrder);
    } catch (error) {
        next(error);
    }
}

export const deleteOrder = async (req, res, next) => {
    try {
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been Deleted");
    } catch (error) {
        next(error);
    }
}

export const getOrder = async (req, res, next) => {
    try {
        const Order = await Order.findById(req.params.id)
        res.status(200).json(Order);
    } catch (error) {
        // res.status(500).json(error);
        next(error);
    }
}

export const getOrders = async (req, res, next) => {
    // const failed = true;
    // if(failed) return next(createError(401, "You are not Auny"));

    try {
        const Orders = await Order.find();
        res.status(200).json(Orders);
    } catch (error) {
        next(error);
    }
}