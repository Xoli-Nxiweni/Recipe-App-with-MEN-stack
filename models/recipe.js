import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// Custom validator function for ingredients length
let arrayLimit = (value) => {
    return value.length <= 10; 
  };

// Define recipe schema with validation
const recipeSchema = new Schema({
  name: {
    type: String,
    required: [true, "Recipe name is required"],
  },
  ingredients: {
    type: [
      {
        type: String,
        required: [true, "Ingredients are required"],
      },
    ],
    validate: [arrayLimit, "{PATH} exceeds the limit of 10 ingredients"],
  },
  instructions: {
    type: String,
    required: [true, "Instructions are required"],
  },
  prepTime: {
    type: Number,
    required: [true, "Prep time is required"],
  },
  cookTime: {
    type: Number,
    required: [true, "Cook time is required"],
  },
  servings: {
    type: Number,
    required: [true, "Servings are required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


// Create Recipe model
const Recipe = model("Recipe", recipeSchema);

export default Recipe;
