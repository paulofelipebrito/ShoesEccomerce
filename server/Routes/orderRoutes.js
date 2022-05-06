import express from "express";
import asyncHandler from 'express-async-handler'
import protect from "../Middleware/AuthMiddleware";
import Order from "../Models/OrderModel.js";

const orderRouter = express.Router();

//ORDER
orderRouter.post(
  "/",
   protect,
   asyncHandler(
    async (req, res) => {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      } = req.body;

      if(orderItems && orderItems.length === 0){
        res.status(400);
        throw new Error("No order items");
      } else {
        const order = new Order({
          orderItems,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice,
        }) 

        const createOrder = await order.save();
        res.status(201).json(createOrder);
      }
    }
));

export default orderRouter;