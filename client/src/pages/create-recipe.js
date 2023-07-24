import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID.js";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function CreateRecipe() {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);

  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imgUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setRecipe({ ...recipe, [name]: value });
  };

  const addIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] }); //adding an empty string to the ingredients array when button clicked
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = recipe.ingredients;
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post("http://localhost:3001/recipes", recipe, {
        headers: { authorization: cookies.access_token },
      });
      alert("Recipe Created!");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <h2> Create Recipe </h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="name"> Name </label>
        <input type="text" id="name" name="name" onChange={handleChange} />

        <label htmlFor="ingredients"> Ingredients </label>
        {recipe.ingredients.map((ingredient, index) => (
          // mapping through -> ["",""]
          <input
            key={index}
            type="text"
            name="ingredient"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
          />
        ))}
        <button type="button" onClick={addIngredient}>
          Add Ingredient
        </button>

        <label htmlFor="instructions"> Instructions </label>
        <textarea
          id="instructions"
          name="instructions"
          onChange={handleChange}
        ></textarea>

        <label htmlFor="imgUrl"> Image URL </label>
        <input type="text" id="imgUrl" name="imgUrl" onChange={handleChange} />

        <label htmlFor="cookingTime"> Cooking Time (Minutes) </label>
        <input
          type="text"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />

        <button type="submit"> Create Recipe </button>
      </form>
    </div>
  );
}
