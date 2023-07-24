import express from "express";
import { recipeModel } from "../models/Recipes.js";
import { userModel } from "../models/Users.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await recipeModel.find({});
    res.json(response);
  } catch (error) {
    res.json(error);
  }
});
router.post("/", verifyToken, async (req, res) => {
  const recipe = new recipeModel(req.body);

  try {
    const response = await recipe.save();
    res.json(recipe);
  } catch (error) {
    res.json(error);
  }
});
//save
router.put("/", verifyToken, async (req, res) => {
  try {
    const { userId, recipeId } = req.body;
    const recipe = await recipeModel.findById(recipeId);
    const user = await userModel.findById(userId);
    user.savedRecipes.push(recipe);
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
//get-saved-recipe-id's for a user
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    res.json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.json(error);
  }
});
//get-saved-recipe's for a user
router.get("/savedRecipes/:userId", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.userId);
    const savedRecipes = await recipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.json(savedRecipes);
  } catch (error) {
    res.json(error);
  }
});

export { router as recipesRouter };
