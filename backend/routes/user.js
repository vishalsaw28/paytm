import express from "express";
import mongoose from "mongoose";
import JWT_SECRET from "../config";
const zod = require("zod");
const router = express.Router;
const JWT =
  // signup and signIn route

  (signupSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    password: zod.string(),
  }));

router.post("/signup", async (req, res) => {
  const body = req.body;
  const { success } = signupSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      message: "Email already taken/ Incorrect inouts",
    });
  }

  const user = User.findOne({
    username: body.username,
  });

  if (user._id) {
    return res.json({
      message: "Email already taken /Incorrect input",
    });
  }

  const dbUser = await User.create(body);
  const token = jwt.sign(
    {
      userId: jwt.sign._id,
    },
    JWT_SECRET,
  );
  res.json({
    message: "user created successfully",
    token: token,
  });
});

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.module("User", userSchema);

export default router;
