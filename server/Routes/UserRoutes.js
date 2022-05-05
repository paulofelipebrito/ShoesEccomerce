import express from "express";
import asyncHandler from 'express-async-handler'
import User from "../Models/UserModel.js";

const userRouter = express.Router();

//LOGIN
userRouter.post(
  "/login",
   asyncHandler(
    async (req, res) => {
      const {email, password} = req.body;
      const user = await User.findOne({ email });
      if(user && (await user.comparePassword(password))) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: null,
          created_at: user.created_at,
        })
      } else {
        res.status(401);
        throw new Error("Invalid Email or Password");
      }
    }
));

export default userRouter;