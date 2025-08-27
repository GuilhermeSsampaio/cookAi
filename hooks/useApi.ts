import Toast from "react-native-toast-message";
import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

export function useApi() {
  const getSavedRecipes = async () => {
    try {
      const response = await api.get("/saved_recipes");
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao carregar receitas",
        text2: "Tente novamente mais tarde",
      });
      throw error;
    }
  };

  const saveRecipe = async (dados: any) => {
    try {
      const response = await api.post("/save_recipe", dados);
      Toast.show({
        type: "success",
        text1: "Receita salva com sucesso!",
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao salvar receita",
        text2: "Tente novamente mais tarde",
      });
      throw error;
    }
  };

  const scrapRecipe = async (url: string) => {
    try {
      console.log("Scraping URL:", url);
      const response = await api.post(`/scrap?url=${encodeURIComponent(url)}`);
      Toast.show({
        type: "success",
        text1: "Receita extraída com sucesso!",
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao extrair receita",
        text2: "Verifique a URL e tente novamente",
      });
      throw error;
    }
  };

  return {
    getSavedRecipes,
    saveRecipe,
    scrapRecipe,
  };
}
