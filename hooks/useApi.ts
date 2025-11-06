import Toast from "react-native-toast-message";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const isDevelopment = process.env.NODE_ENV === "development";
// const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:8000";

const BASE_URL = isDevelopment
  ? "http://localhost:8000"
  : "https://cookaiapi.squareweb.app";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 40000,
});

export function useApi() {
  const getSavedRecipes = async (userId: number) => {
    console.log("id: ", userId);
    try {
      const response = await api.get(`/cook_ai/recipes/user/${userId}`);
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

  const saveRecipe = async (userId: number, dados: any) => {
    try {
      const response = await api.post(
        `/cook_ai/recipes/user/${userId}/save`,
        dados
      );
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

  const createUser = async (dados: any) => {
    try {
      const response = await api.post("/auth/users/register", dados);
      Toast.show({
        type: "success",
        text1: "Usuário criado com sucesso!",
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao criar usuário",
        text2: "Tente novamente mais tarde",
      });
      throw error;
    }
  };

  const loginUser = async (dados: any) => {
    try {
      console.log("Logging in with data:", dados);
      const response = await api.post("/auth/users/login", dados);

      console.log("Login response:", response.data);

      await AsyncStorage.setItem("userData", JSON.stringify(response.data));

      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
      });
      return response.data;
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Credenciais inválidas ou erro no servidor.",
      });
      console.log("Login error:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      Toast.show({
        type: "success",
        text1: "Logout realizado com sucesso!",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer logout",
        text2: "Tente novamente mais tarde.",
      });
      throw error;
    }
  };

  const getUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");

      if (!userData) {
        console.log("Nenhum dado de usuário encontrado no storage");
        return null;
      }

      const userDataObject = JSON.parse(userData);

      // Validar se o objeto tem as propriedades necessárias
      if (!userDataObject || typeof userDataObject !== "object") {
        console.log("Dados do usuário inválidos");
        return null;
      }

      console.log("Dados do usuário recuperados:", userDataObject);

      // Retornar o objeto completo em vez de apenas o ID
      return userDataObject;
    } catch (error) {
      console.error("Erro ao recuperar os dados do usuário:", error);
      return null;
    }
  };

  const scrapRecipe = async (url: string) => {
    try {
      console.log("Scraping URL:", url);
      const response = await api.post(
        `cook_ai/recipes/scrap?url=${encodeURIComponent(url)}`
      );
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
  const searchRecipes = async (query: string) => {
    try {
      // Exemplo de chamada para uma API de receitas
      const response = await api.post("cook_ai/recipes/search", { query });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      throw error;
    }
  };

  return {
    getSavedRecipes,
    saveRecipe,
    scrapRecipe,
    createUser,
    loginUser,
    logoutUser,
    getUserData,
    searchRecipes,
  };
}
