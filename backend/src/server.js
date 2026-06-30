require("dotenv").config();
const cors=require("cors");
const multer=require("multer");
const express = require("express");
const cookieParser = require("cookie-parser");

const connectToMongoDB = require("./config/database");
const authRouter = require("./routes/auth.routes");

const app = express();

// Connect to database
connectToMongoDB();

// Middleware
app.use(cors());
//app.use(multer().none());
app.use(express.json());
app.use(cookieParser());



// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});