import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "localhost:8000";

const api = axios.create({
  baseURL: BASE_URL, // Altere para a URL do seu backend
  timeout: 15000,
});

export function useApi() {
  const getSavedRecipes = async () => {
    const response = await api.get("/saved_recipes");
    return response.data;
  };

  // Exemplo: criar uma nova receita
  const saveRecipe = async (dados: any) => {
    const response = await api.post("/save_recipe", dados);
    return response.data;
  };

  const scrapRecipe = async (url: string) => {
    console.log("Scraping URL:", url);
    const response = await api.post(`/scrap?url=${encodeURIComponent(url)}`);
    return response.data;
  };
  // Exemplo: buscar uma receita por ID
  //   const getReceitaPorId = async (id: string) => {
  //     const response = await api.get(`/receitas/${id}`);
  //     return response.data;
  //   };

  // Adicione outras funções conforme necessário

  return {
    getSavedRecipes,
    saveRecipe,
    scrapRecipe,

    // ...outras funções
  };
}
