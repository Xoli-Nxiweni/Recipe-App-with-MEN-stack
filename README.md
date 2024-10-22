# Recipe App - RESTful API

This project is a **Recipe App** RESTful API built using **Node.js**, **Express**, and **MongoDB**. It provides full CRUD operations for managing recipes, with input validation, pagination for large datasets, and error handling. Users can create, retrieve, update, and delete recipes. The project also supports easy testing with tools like **Postman** or **Insomnia**.

## Features

- **CRUD operations**: Create, read, update, and delete recipes.
- **Input Validation**: Ensures correct data types and required fields.
- **Error Handling**: Graceful error handling with informative messages.
- **Pagination**: Efficient handling of large datasets using pagination.
- **Testing**: API endpoints can be tested with Postman or Insomnia.

---

## Getting Started

### Prerequisites

Before running the application, ensure that you have the following installed:

- **Node.js** (v12+)
- **MongoDB** (local or MongoDB Atlas for cloud)
- **Postman** or **Insomnia** for testing

### Installation

Follow these steps to get the project running on your local machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Xoli-Nxiweni/Recipe-App-with-MEN-stack.git
   cd Recipe-App-with-MEN-stack
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root of the project with the following content:

   ```
   MONGODB_URI=mongodb://localhost:27017/recipeApp
   PORT=5000
   ```

4. **Run the application:**
   ```bash
   npm start
   ```

   The server will run at `http://localhost:5000`.

---

## Data Model

The recipe data is stored in MongoDB using the following **Mongoose schema**:

```javascript
{
  name: { type: String, required: true, maxlength: 50 },
  ingredients: { type: [String], required: true, validate: [arrayLimit, 'Exceeds the limit of 10'] },
  instructions: { type: String, required: true },
  prepTime: { type: Number, required: true, min: 0 },
  cookTime: { type: Number, required: true, min: 0 },
  servings: { type: Number, required: true, min: 1 },
  createdAt: { type: Date, default: Date.now },
  __v: { type: Number }
}
```

---

## API Endpoints

### POST /recipes
**Create a new recipe**

- **URL**: `/recipes`
- **Method**: `POST`
- **Body Parameters**:
  ```json
  {
    "name": "Recipe Name",
    "ingredients": ["Ingredient1", "Ingredient2"],
    "instructions": "Instructions here",
    "prepTime": 15,
    "cookTime": 30,
    "servings": 4
  }
  ```

### GET /recipes
**Get a list of recipes (supports pagination)**

- **URL**: `/recipes`
- **Method**: `GET`
- **Query Parameters**:
  - `page`: The page number (default: 1)
  - `pageSize`: Number of items per page (default: 10)

### GET /recipes/:id
**Get a recipe by ID**

- **URL**: `/recipes/:id`
- **Method**: `GET`

### PUT /recipes/:id
**Update a recipe by ID**

- **URL**: `/recipes/:id`
- **Method**: `PUT`
- **Body Parameters**: Same as `POST /recipes`

### DELETE /recipes/:id
**Delete a recipe by ID**

- **URL**: `/recipes/:id`
- **Method**: `DELETE`

---

## Input Validation

Validation is performed on incoming data using **express-validator**. The following rules are applied:

- **name**: Must be a non-empty string, with a maximum length of 50 characters.
- **ingredients**: Must be an array of strings (up to 10 items), and each item must be a non-empty string.
- **instructions**: Must be a non-empty string.
- **prepTime**: Must be a non-negative integer.
- **cookTime**: Must be a non-negative integer.
- **servings**: Must be a positive integer.

If validation fails, a `400 Bad Request` is returned with detailed error messages.

---

## Error Handling

Errors are handled gracefully, and all errors result in informative responses to the client. If something goes wrong, like a missing or invalid field, the server responds with an appropriate status code and error message.

### Example Error Response

```json
{
  "errors": [
    {
      "msg": "Recipe name is required",
      "param": "name",
      "location": "body"
    }
  ]
}
```

---

## Pagination

The `GET /recipes` endpoint supports pagination. Users can specify the page number and page size, and the API will return the corresponding subset of recipes, along with metadata like the total count and current page.

### Example Response for Paginated Data

```json
{
  "total": 100,
  "page": 2,
  "pageSize": 10,
  "recipes": [
    {
      "_id": "6716b914b8f4f70e1521e4f9",
      "name": "Spaghetti Carbonara",
      "ingredients": ["Spaghetti", "Eggs", "Pancetta"],
      "instructions": "Boil pasta...",
      "prepTime": 10,
      "cookTime": 20,
      "servings": 4
    }
    // More recipes here
  ]
}
```

---

## Testing the API

Use **Postman** or **Insomnia** to test the API endpoints. Below are examples of typical HTTP requests:

1. **POST /recipes**: Create a new recipe.
2. **GET /recipes**: Retrieve all recipes with pagination.
3. **GET /recipes/:id**: Retrieve a specific recipe by ID.
4. **PUT /recipes/:id**: Update a recipe by ID.
5. **DELETE /recipes/:id**: Delete a recipe by ID.

Be sure to test the validation rules by sending incorrect or missing fields to observe how errors are handled.

---

## Contributions

Feel free to contribute to this project by submitting a pull request on the GitHub repository. If you encounter any issues, report them via GitHub Issues.

- **Repository**: [Recipe-App-with-MEN-stack](https://github.com/Xoli-Nxiweni/Recipe-App-with-MEN-stack.git)
- **Email for contributions**: xolinxiweni@gmail.com
