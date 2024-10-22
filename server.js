import express from "express";
import { connect } from "mongoose";
import cors from "cors";
import recipeRoutes from "./routes/recipes.js";
import env from "dotenv";
import validateRecipe from "./middleware/validateRecipes.js";

env.config();

const PORT = process.env.PORT || 4040;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Route
app.use("/", recipeRoutes, validateRecipe);

// MongoDB connection
connect(process.env.MONGO_URI)
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