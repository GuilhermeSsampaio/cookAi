import Header from "@/components/Header";
import RecipesList from "@/components/RecipesList";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";

export default function Book() {
  const [recipes, setRecipes] = useState([]);

  const getRecipes = async () => {
    try {
      const recipes = await fetch("http://localhost:8000/saved_recipes", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((res) => res.json());
      setRecipes(recipes);
      console.log("Fetched recipes:", recipes);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  return (
    <View>
      <Header />
      {/* <Text>Recipes Book</Text>
      <Text>Here you can save your favorite recipes.</Text>
      {recipes.length > 0 ? (
        recipes.map((recipe, index) => (
          <ScrollView key={index} style={{ maxHeight: 200, marginBottom: 20 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>
              {recipe.title || "Untitled Recipe"}
            </Text>
            <Markdown></Markdown>
            <Markdown style={markdownStyles} key={index}>
              {recipe.content}
            </Markdown>
          </ScrollView>
        ))
      ) : (
        <Text>Nenhuma receita encontrada</Text>
      )}
      <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>
        More features coming soon!
      </Text> */}
      <RecipesList />
    </View>
  );
}

const markdownStyles = {
  body: { color: "#444", fontSize: 15 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};
