const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('mongodb+srv://great:pa$$word@cluster0.sjykurd.mongodb.net/fortress', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Import controllers
const {
  createContact,
  getAllContacts,
  updateContact,
  deleteContact,
} = require("./controllers/controllers");

// Routes
app.post("/api/contacts", upload.single("photo"), createContact);
app.get("/api/contacts", getAllContacts);
app.put("/api/contacts/:id", upload.single("photo"), updateContact);
app.delete("/api/contacts/:id", deleteContact);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
