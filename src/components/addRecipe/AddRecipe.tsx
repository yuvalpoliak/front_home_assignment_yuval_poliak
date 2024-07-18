import { ChangeEvent, FormEvent, useState } from "react";
import "./addrecipe.css";
import { recipe } from "../../types";
import { postRecipe } from "../../api/recipeApis";
import { initialRecipeState } from "../../pages/mainPage/MainPage";
import { useAtAdd } from "../../context/AtAddRecipe";

export default function AddRecipe() {
  const [recipe, setRecipe] = useState<recipe>(initialRecipeState);
  const { setAtAdd } = useAtAdd();

  const updateText = (
    key: "title" | "content",
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    let newState = recipe;
    newState[key] = event.target.value;

    setRecipe(newState);
  };

  const updateCheckbox = (key: "vegan" | "hot") => {
    let newState = recipe;
    newState[key] = !newState[key];
    setRecipe(newState);
  };

  const uploadRecipe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const res = await postRecipe(recipe);

    if (res.status > 300) {
      alert("could not upload the recipe. try again later");
      throw new Error("network error");
    }
    alert("successfully added a new recipe!");
    setAtAdd(false);
  };

  return (
    <form className="containerAtAdd" onSubmit={uploadRecipe}>
      <div className="closeAdd" onClick={() => setAtAdd(false)}>
        X
      </div>
      <div className="addTitle">
        <h1>Title</h1>
        <input
          type="text"
          name="title"
          className="titleInput"
          onChange={(e) => updateText("title", e)}
        />
      </div>
      <div className="addContent">
        <h1>Ingredients</h1>
        <textarea
          name="content"
          className="contentInput"
          onChange={(e) => updateText("content", e)}
        />
      </div>
      <div className="checkboxContainer">
        <div>
          <label>vegan</label>
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => updateCheckbox("vegan")}
          />
        </div>
        <div>
          <label>Hot</label>
          <input
            type="checkbox"
            className="checkbox"
            onChange={() => updateCheckbox("hot")}
          />
        </div>
      </div>

      <div className="containerSend">
        <input className="btn" type="submit" value={"Send"}></input>
      </div>
    </form>
  );
}
