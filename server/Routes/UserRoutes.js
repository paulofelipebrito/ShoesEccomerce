import express from "express";
import asyncHandler from 'express-async-handler'
import protect from "../Middleware/AuthMiddleware.js";
import User from "../Models/UserModel.js";
import generateToken from '../utils/generateToken.js';

const userRouter = express.Router();

//LOGIN
userRouter.post(
  "/login",
   asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      console.log(req.body)
      const user = await User.findOne({ email });
      if(user && (await user.comparePassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
          created_at: user.created_at,
        })
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
    }
));

//REGISTER
userRouter.post(
  "/",
   asyncHandler(
    async (req, res) => {
      const {name, email, password} = req.body;
      const userExists = await User.findOne({ email });

      if(userExists) {
        res.status(400);
        throw new Error("User already exists");
      }

      const user = await User.create({
        name,
        email,
        password
      });

      if(user){
        res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user._id),
        })
      } else {
        res.status(400);
        throw new Error("Invalid User Data");
      }
    }
));

// USER PROFILE
userRouter.get(
  "/profile",
   protect,
   asyncHandler(
    async (req, res) => {
      const user = await User.findById(req.user._id);
      if(user){
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          created_at: user.created_at,
        })
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    }
));

// UPDATE PROFILE
userRouter.put(
  "/profile",
   protect,
   asyncHandler(
    async (req, res) => {
      const user = await User.findById(req.user._id);
      if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if(req.body.password){
          user.password = req.body.password || user.password
        }
        const updateUser = await user.save();
        res.json({
          _id: updateUser._id,
          name: updateUser.name,
          email: updateUser.email,
          isAdmin: updateUser.isAdmin,
          created_at: updateUser.created_at,
          token: generateToken(updateUser._id),
        })
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    }
));

export default userRouter;