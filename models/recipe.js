import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// Custom validator function for ingredients length
const arrayLimit = (value) => Array.isArray(value) && value.length <= 10;

// Define recipe schema with validation
const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"],
    maxlength: [50, "Recipe name cannot exceed 50 characters"]
  },
  ingredients: {
    type: [
      {
        type: String,
        required: [true, "Each ingredient is required"],
        trim: true,
        maxlength: [100, "Ingredient name cannot exceed 100 characters"]
      }
    ],
    validate: {
      validator: arrayLimit,
      message: "Ingredients list exceeds the limit of 10 items"
    }
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
    maxlength: [2000, "Instructions cannot exceed 2000 characters"]
  },
  prepTime: {
    type: Number,
    required: [true, "Prep time is required"],
    min: [0, "Prep time cannot be negative"]
  },
  cookTime: {
    type: Number,
    required: [true, "Cook time is required"],
    min: [0, "Cook time cannot be negative"]
  },
  servings: {
    type: Number,
    required: [true, "Servings are required"],
    min: [1, "Servings must be at least 1"]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

// Create Recipe model
const Recipe = model("Recipe", recipeSchema);

export default Recipe;
