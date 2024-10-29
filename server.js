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

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connection to the DB successful");
    // Start the server
    app.listen(PORT, (err) => {
      (err)
        ? console.log("An error occurred while running the server:", err)
        : console.log("Server running on port", PORT);
    });
  })
  .catch((error) => console.error("Error occurred:", error));