const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const dotenv = require("dotenv");

const User = require("./models/Users.model");
const postsRoutes = require("./Routes/Posts.routes");
const { protect } = require("./Middleware/authMiddleware");

dotenv.config(); // ✅ عشان نقرأ من ملف .env

const app = express();

// =================== MIDDLEWARE ===================
app.use(express.json());
app.use(cors());

// =================== HELPERS ===================
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// =================== USER ROUTES ===================

// Register
app.post("/api/users/register", async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({
      message: "Success",
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login
app.post("/api/users/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        message: "Success",
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================== POSTS ROUTES ===================
app.use("/api/posts", postsRoutes);

// =================== DATABASE CONNECTION ===================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to Database");
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ DB Connection Failed:", err.message);
  });
