import Recipe from "../models/recipe.js";

const ValidateInputs = () =>{

}

const addRecipe = async (req, res) => {
  try {
    // Set userId to the _id of the authenticated user
    const recipeData = {
      ...req.body,
      userId: req.user._id,
    };

    const recipe = new Recipe(recipeData);
    await recipe.save();

    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

  const readAllRecipes = async (req, res) => {
    try {
      const { page = 1, pageSize = 5 } = req.query;
      const skip = (page - 1) * pageSize;
  
      const totalRecipes = await Recipe.countDocuments(); 
      const recipes = await Recipe.find()
        .skip(skip)
        .limit(Number(pageSize));
  
      res.json({ total: totalRecipes, page: Number(page), pageSize: Number(pageSize), recipes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const readAllRecipesById = async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id); 
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
      res.json(recipe);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const removeRecipe = async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) return res.status(404).json({ error: 'Recipe not found' });
      res.json({ message: 'Recipe deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  const updateRecipe = async (req, res) => {
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
  }

  export default {
    addRecipe,
    readAllRecipes, 
    readAllRecipesById, 
    removeRecipe,
    updateRecipe
  }