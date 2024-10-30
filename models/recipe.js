import mongoose, { model } from "mongoose";
import validator from "validator";

const { Schema } = mongoose;

// Custom validator function for ingredients array length
const arrayLimit = (value) => Array.isArray(value) && value.length <= 10;

// Define recipe schema with validation
const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"],
    maxlength: [50, "Recipe name cannot exceed 50 characters"],
    validate: {
      validator: function (value) {
        return /^[a-zA-Z\s-]+$/.test(value); // Allows only letters, spaces, and hyphens
      },
      message: "Recipe name can only contain letters, spaces, and hyphens"
    }
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
    maxlength: [2000, "Instructions cannot exceed 2000 characters"],
    validate: {
      validator: function (value) {
        return validator.isLength(value, { min: 10 });
      },
      message: "Instructions should be at least 10 characters long"
    }
  },
  prepTime: {
    type: Number,
    required: [true, "Prep time is required"],
    min: [0, "Prep time cannot be negative"],
    validate: {
      validator: Number.isInteger,
      message: "Prep time must be an integer"
    }
  },
  cookTime: {
    type: Number,
    required: [true, "Cook time is required"],
    min: [0, "Cook time cannot be negative"],
    validate: {
      validator: Number.isInteger,
      message: "Cook time must be an integer"
    }
  },
  servings: {
    type: Number,
    required: [true, "Servings are required"],
    min: [1, "Servings must be at least 1"],
    validate: {
      validator: Number.isInteger,
      message: "Servings must be an integer"
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required to associate the recipe"]
  }
});

// Create Recipe model
const Recipe = model("Recipe", recipeSchema);

export default Recipe;
