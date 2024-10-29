import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import validateRecipe from '../middleware/validateRecipes.js'
import recipeController from '../controllers/recipeController.js';
import userController from '../controllers/userController.js';

const router = Router();

// Recipe Endpoints
router.post('/recipes', authMiddleware, authorize(['admin', 'user']), validateRecipe, recipeController.addRecipe); // Add a new recipe
router.get('/recipes',authMiddleware, recipeController.readAllRecipes); // Get all recipes with pagination
router.get('/recipes/:id', recipeController.readAllRecipesById); // Get recipe by ID
router.put('/recipes/:id', authMiddleware, authorize(['admin', 'user']), validateRecipe, recipeController.updateRecipe); // Update a recipe by ID
router.delete('/recipes/:id', authMiddleware, authorize(['admin', 'user']), recipeController.removeRecipe); // Delete a recipe by ID

// User Endpoints
router.post('/user', userController.registerUser); // Register a new user
router.post('/user/login', userController.loginUser); // User login

export default router;
