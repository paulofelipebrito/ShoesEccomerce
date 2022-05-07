import express from "express";
import asyncHandler from 'express-async-handler'
import protect from "../Middleware/AuthMiddleware.js";
import Product from "../Models/ProductModel.js";

const productRoute = express.Router();

//GET ALL PRODUCTS
productRoute.get(
  "/",
   asyncHandler(
    async (req, res) => {
      console.log(req.body.keyword);
      const keyword = req.query.keyword ? {
        name:{
          $regex: req.query.keyword,
          $options: "i"
        },
      } : {};
      const products = await Product.find({...keyword});
      res.json(products);
    }
));

//GET SINGLE PRODUCT
productRoute.get(
  "/:id",
   asyncHandler(
    async (req, res) => {
      const product = await Product.findById(req.params.id);
      if (product) {
        res.json(product);
      }else{
        res.status(404);
        throw new Error("Product not found");
      }
      
    }
));

//PRODUCT REVIEW
productRoute.post(
  "/:id/review",
    protect,
   asyncHandler(
    async (req, res) => {
      const { rating, comment } = req.body;
      const product = await Product.findById(req.params.id);

      if (product) {
        const alreadyReviewed = product.review.find(
          (r) => r.user.toString() === req.user._id.toString()
        );
        
        if(alreadyReviewed) {
          res.status(400);
          throw new Error("Product already Reviewed");
        }
        const review = {
          name: req.user.name,
          rating: Number(rating),
          comment,
          user: req.user._id
        };

        product.review.push(review);
        product.numReviews = product.review.length;
        product.rating = 
          product.review.reduce((acc,item)=> item.rating + acc,0) / product.review.length;
        
        await product.save();
        res.status(201).json({message:"Reviewed Added"});
      }else{
        res.status(404);
        throw new Error("Product not found");
      }
      
    }
));

export default productRoute;