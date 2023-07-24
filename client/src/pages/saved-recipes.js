import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useCookies } from "react-cookie";

export default function SavedRecipes() {
  const [cookies, _] = useCookies(["access_token"]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const userId = useGetUserID();

  useEffect(() => {
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/recipes/savedRecipes/${userId}`
        );

        setSavedRecipes(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (cookies.access_token) fetchSavedRecipes();
  }, []);

  return (
    <div>
      <h1> Saved Recipes </h1>
      <ul>
        {savedRecipes &&
          savedRecipes.map((recipe) => (
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
