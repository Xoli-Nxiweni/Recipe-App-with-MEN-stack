import express from "express";
import { mongoose } from "mongoose";
import cors from "cors";
import recipeRoutes from "./routes/api.js";
import env from "dotenv";

env.config();

const PORT = process.env.PORT || 4040;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/api", recipeRoutes);

// MongoDB connection with current options
const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000
    };

    await mongoose.connect(process.env.MONGO_URI, options);
    console.log("Connection to the DB successful");
    
    // Start the server after successful DB connection
    app.listen(PORT, (err) => {
      if (err) {
        console.log("An error occurred while running the server:", err);
        return;
      }
      console.log("Server running on port", PORT);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Call the connect function
connectDB();