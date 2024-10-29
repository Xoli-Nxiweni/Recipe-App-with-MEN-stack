import { body, validationResult } from 'express-validator';

// Recipe Validation Middleware
const validateRecipe = [
  // Validate 'name' - Must be a non-empty string
  body('name')
    .isString().withMessage('Recipe name must be a string')
    .trim()
    .notEmpty().withMessage('Recipe name is required')
    .isLength({ max: 50 }).withMessage('Recipe name cannot exceed 50 characters'),

  // Validate 'ingredients' - Must be an array of strings with a max of 10 items
  body('ingredients')
    .isArray({ max: 10 }).withMessage('Ingredients cannot exceed 10 items')
    .custom((ingredients) => {
      if (ingredients.some((item) => typeof item !== 'string' || item.trim() === '')) {
        throw new Error('Each ingredient must be a non-empty string');
      }
      return true;
    }),

  // Validate 'instructions' - Must be a non-empty string
  body('instructions')
    .isString().withMessage('Instructions must be a string')
    .trim()
    .notEmpty().withMessage('Instructions are required'),

  // Validate 'prepTime' and 'cookTime' - Must be positive integers
  body('prepTime')
    .isInt({ min: 0 }).withMessage('Prep time must be a non-negative integer'),
  body('cookTime')
    .isInt({ min: 0 }).withMessage('Cook time must be a non-negative integer'),

  // Validate 'servings' - Must be a positive integer
  body('servings')
    .isInt({ min: 1 }).withMessage('Servings must be at least 1'),

  // Validate 'createdAt' - Optional field, must be a valid ISO8601 date if provided
  body('createdAt')
    .optional()
    .isISO8601().withMessage('CreatedAt must be a valid date'),

  // Validate '__v' - Optional field, must be a non-negative integer if provided
  body('__v')
    .optional()
    .isInt({ min: 0 }).withMessage('__v must be a non-negative integer'),

    // Validate 'userId' - Must be a non-empty string
body('userId')
.isString().withMessage('User ID must be a string')
.notEmpty().withMessage('User ID is required'),

  // Error handling
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateRecipe;
