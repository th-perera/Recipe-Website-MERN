import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";

export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);

  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:3001/recipes", {
        userId,
        recipeId,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <h1> Recipes </h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2> {recipe.name} </h2>
              <button onClick={() => saveRecipe(recipe._id)}> Save </button>
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
