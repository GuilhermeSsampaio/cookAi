import Header from "@/components/Header";
import RecipesList from "@/components/RecipesList";
import { useApi } from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function Book() {
  const useApiHook = useApi();
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const response = await useApiHook.getSavedRecipes();
      setRecipes(response);
      console.log("Fetched recipes:", recipes);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ed4f27ff",
          marginVertical: 10,
          marginLeft: 16,
        }}
      >
        📖 Recipes Book
      </Text>
      <RecipesList />
    </View>
  );
}

const markdownStyles = {
  body: { color: "#444", fontSize: 15 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};
