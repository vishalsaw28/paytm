const express = require("express");
const jwt = require("jsonwebtoken");
const { z } = require("zod");

const { JWT_SECRET } = require("../config");
const { User, Account } = require("../db");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});

router.post("/signup", async (req, res) => {
  const body = req.body;
  const parsedBody = signupBody.safeParse(body);

  if (!parsedBody.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    username: body.username,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const dbUser = await User.create(body);
  await Account.create({
    userId: dbUser._id,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId: dbUser._id,
    },
    JWT_SECRET,
  );

  return res.json({
    message: "User created successfully",
    token,
  });
});

const signInBody = z.object({
  username: z.string().email(),
  password: z.string().min(6),
});

const signInHandler = async (req, res) => {
  const parsedBody = signInBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(411).json({
      message: "Incorrect input",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (!user) {
    return res.status(411).json({
      message: "Error while logging in",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    JWT_SECRET,
  );

  return res.json({
    token,
  });
};

router.post("/signin", signInHandler);
router.post("/signIn", signInHandler);

const updateBody = z.object({
  password: z.string().min(6).optional(),
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const parsedBody = updateBody.safeParse(req.body);

  if (!parsedBody.success) {
    return res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne(
    {
      _id: req.userId,
    },
    req.body,
  );

  return res.json({
    message: "Updated successfully",
  });
});

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
          $options: "i",
        },
      },
      {
        lastName: {
          $regex: filter,
          $options: "i",
        },
      },
    ],
  });

  return res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
