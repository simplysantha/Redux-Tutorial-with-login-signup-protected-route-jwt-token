const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
const SECRET_KEY = "your_secret_key";

/* Database Integration Code */
mongoose.connect("mongodb://localhost:27017/BankDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("Connected to MongoDB database!");
});

db.on("error", (err) => console.log("Connection error ", err));

/* Schema Creation */
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  balance: {
    type: Number,
    default: 0
  }
});

const User = mongoose.model("User", UserSchema);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Register Endpoint
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    const user = await newUser.save();
    res.status(201).send({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Login Endpoint
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id, name: user.name }, SECRET_KEY, {
      expiresIn: "1d"
    });
    res.send({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Middleware for Authentication
const authenticate = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).send({ message: "No token provided" });
  }

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized" });
    }
    req.userId = decoded.id;
    next();
  });
};

// Get User Profile Endpoint
app.get("/profile", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId, "-password");
    res.send({ user });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Deposit Endpoint
app.post("/deposit", authenticate, async (req, res) => {
  const { DepositAmount } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { $inc: { balance: DepositAmount } },
      { new: true }
    );
    res.send({ message: "Deposit successful", balance: user.balance });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Withdraw Endpoint
app.post("/withdraw", authenticate, async (req, res) => {
  const { WithdrawAmount } = req.body;

  try {
    const user = await User.findById(req.userId);
    if (user.balance < WithdrawAmount) {
      return res.status(400).send({ message: "Insufficient funds" });
    }
    user.balance -= WithdrawAmount;
    const updatedUser = await user.save();
    res.send({
      message: "Withdrawal successful",
      balance: updatedUser.balance
    });
  } catch (err) {
    res.status(500).send(err);
  }
});

// Check Balance Endpoint
app.get("/balance", authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    res.send({ balance: user.balance });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});