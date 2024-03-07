import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
import { MealCard } from "./Components/MealCard";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("");
  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm)
  };

  // use effect
  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`
        );
        setResult(response.data.meals);
        console.log(result)
      } catch (error) {
        console.log("error fetching", error);
      }
    };
    fetchMeal();
  }, [searchTerm]);
  return (
    <>
      <h1 className="font-bold text-blue-600">Meal Seach Machine</h1>
      <form action="">
        <input
          type="text"
          placeholder="search for a meal..."
          value={searchTerm}
          onChange={handleSearchTerm}
          className=" reounded border border-gray-300 py-2 px-4"
        />
      </form>
      {/* meal secah results display */}
      <div>
        { result?.map((meal) => (
          <div key={meal.idMeal} className="border border-gray-300 rounded p-4">
          <h3 className=" font-bold"> {meal.strMeal} </h3>
          <img src={meal.strMealThumb} className="mb-2" alt={meal.strMeal} />
          <p>
            <span className=" font-bold">Instructions</span>
            {meal?.strInstructions}
          </p>
          <p>
            <span className="font-bold">Category</span>
            {meal?.category}
          </p>
        </div>
        ))}
      </div>
    </>
  );
}

export default App;
