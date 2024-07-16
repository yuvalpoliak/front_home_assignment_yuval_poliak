import { useEffect, useState } from "react";
import AddRecipe from "../../components/addRecipe/AddRecipe";
import Card from "../../components/card/Card";
import { useAtAdd } from "../../context/AtAddRecipe";
import "./mainPage.css";
import { getAllRecipe } from "../../api/recipeApis";
import { recipe } from "../../types";

export const initialRecipeState = {
  title: "",
  content: "",
  vegan: false,
  hot: false,
};

export default function MainPage() {
  const { atAdd } = useAtAdd();
  const [recipes, setRecipes] = useState<recipe[]>(undefined!);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllRecipe().then((allRecipes) =>
      allRecipes ? setRecipes(allRecipes) : new Error("func return undefined")
    );
    setLoading(false);
  }, [atAdd]);

  return loading == true ? (
    <h1>loading...</h1>
  ) : (
    <div className="containerMainPage">
      {atAdd ? (
        <AddRecipe />
      ) : (
        <div className="wrapperMainPage">
          {recipes?.map((item, key) => (
            <Card cardData={item} key={key} />
          ))}
          <Card key={recipes ? recipes.length + 1 : 0} />
        </div>
      )}
    </div>
  );
}
