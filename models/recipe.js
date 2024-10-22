// import mongoose, { model } from 'mongoose';
// const { Schema } = mongoose;

// // Define recipe schema
// const recipeSchema = new Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   ingredients: [{
//     type: String,
//     required: true
//   }],
//   instructions: {
//     type: String,
//     required: true
//   },
//   category: {
//     type: String
//   },
//   prepTime: {
//     type: Number,
//     required: true
//   },
//   cookTime: {
//     type: Number,
//     required: true
//   },
//   servings: {
//     type: Number,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// // Create Recipe model
// const Recipe = model('Recipe', recipeSchema);

// export default Recipe;

import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

// Custom validator function for ingredients length
let arrayLimit = (val) => {
    return val.length <= 10; 
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
