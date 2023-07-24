import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get("http://localhost:3001/recipes");
        setRecipes(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipes();
  }, []);
  return (
    <div>
      <h1> Recipes </h1>

      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              <h2> {recipe.name} </h2>
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
