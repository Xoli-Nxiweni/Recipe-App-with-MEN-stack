import { Router } from 'express';
import authMiddleware from '../middleware/auth.js';
import authorize from '../middleware/authorize.js';
import recipeController from '../controllers/recipeController.js';
import userController from '../controllers/userController.js';

const router = Router();

// Recipe Endpoints
router.post('/recipes', authMiddleware, authorize(['admin', 'user']), recipeController.addRecipe);
router.get('/recipes', recipeController.readAllRecipes);
router.get('/recipes/:id', recipeController.readAllRecipesById); 
router.put('/recipes/:id', authMiddleware, authorize(['admin', 'user']), recipeController.updateRecipe);
router.delete('/recipes/:id', authMiddleware, authorize(['admin', 'user']), recipeController.removeRecipe);

// User Endpoints
router.post('/user', userController.registerUser);
router.post('/user/login', userController.loginUser);

export default router;
