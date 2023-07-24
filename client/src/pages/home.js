import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/ids/${userId}`
        );

        setSavedRecipes(response.data.savedRecipes);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put(
        "http://localhost:3001/recipes",
        {
          userId,
          recipeId,
        },
        { headers: { authorization: cookies.access_token } }
      );

      setSavedRecipes(response.data.savedRecipes);
    } catch (error) {
      console.error(error);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);
  return (
    <div>
      <h1> Recipes </h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2> {recipe.name} </h2>
              <button
                onClick={() => saveRecipe(recipe._id)}
                disabled={isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>
              {isRecipeSaved(recipe._id) && (
                <p className="recipe-saved-text"> Already Saved </p>
              )}
            </div>
            <div className="instructions">
              <p> {recipe.instructions} </p>
            </div>
            <img src={recipe.imgUrl} alt={recipe.name} />
            <p> Cooking Time : {recipe.cookingTime} (minutes) </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
