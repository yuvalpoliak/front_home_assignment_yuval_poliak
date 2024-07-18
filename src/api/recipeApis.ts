import { recipe } from "../types";
import getCookie from "./getCookie";

//local
//export const ENDPOINT = "http://127.0.0.1:8000/api/v1/";

//prod
export const ENDPOINT =
  "http://ec2-18-153-81-4.eu-central-1.compute.amazonaws.com:8000/api/v1/";

interface serverObj {
  pk: number;
  model: string;
  fields: recipe;
}

export const getAllRecipe = async () => {
  try {
    const res = await fetch(`${ENDPOINT}get-all`);
    if (!res.ok) {
      alert("could not load recipe. please try again later");
      throw new Error("network error");
    }
    const toJson = await res.json();
    const data: serverObj[] = JSON.parse(toJson.data);
    const arrFromFetch: recipe[] = [];
    data.forEach((item) => arrFromFetch.push({ ...item.fields }));
    return arrFromFetch as recipe[];
  } catch (error) {
    console.error(error);
  }
};

export const postRecipe = async (recipe: recipe) => {
  const cookie = getCookie();
  const res = await fetch(`${ENDPOINT}upload-recipe/`, {
    method: "POST",
    body: JSON.stringify(recipe),
    headers: { "X-CSRFToken": cookie },
    mode: "cors",
  });

  return res;
};
