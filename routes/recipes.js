import { Router } from 'express';
import Recipe from '../models/recipe.js';
import validateRecipe from '../middleware/validateRecipes.js';

const router = Router();

// POST /recipes - Add a new recipe
router.post('/recipes', validateRecipe, async (req, res) => {
  try {
    const recipe = await Recipe.create(req.body);
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /recipes - Get all recipes with pagination
router.get('/recipes', async (req, res) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const skip = (page - 1) * pageSize;

    const totalRecipes = await Recipe.countDocuments(); 
    const recipes = await Recipe.find()
      .skip(skip)
      .limit(Number(pageSize));

    res.json({ total: totalRecipes, page: Number(page), pageSize: Number(pageSize), recipes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /recipes/:id - Get recipe by ID
router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id); 
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /recipes/:id - Delete a recipe by ID
router.delete('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT /recipes/:id - Update a recipe by ID
router.put('/recipes/:id', validateRecipe, async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true
    });
    if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
    res.json(recipe);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
