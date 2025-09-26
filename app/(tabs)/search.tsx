import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useApi } from "@/hooks/useApi";
import Recipe from "@/components/Recipe"; // Importa o componente Recipe

export default function Search() {
  const [query, setQuery] = useState(""); // Entrada do usuário
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [results, setResults] = useState([]); // Resultados da busca
  const [selectedRecipe, setSelectedRecipe] = useState(null); // Receita selecionada
  const useApiHook = useApi();

  const handleSearch = async () => {
    if (!query) {
      alert("Por favor, insira uma especificação para buscar receitas.");
      return;
    }

    setLoading(true);
    try {
      // Chama a API para buscar receitas com base na entrada do usuário
      const response = await useApiHook.searchRecipes(query);
      console.log("Resposta da API:", response);

      // Limpa a resposta para garantir que seja um JSON válido
      const cleanedResponse = response.recipes
        .replace(/```json|```/g, "")
        .trim();
      const recipes = JSON.parse(cleanedResponse); // Parseia a resposta JSON
      setResults(recipes);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      alert("Não foi possível buscar receitas. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

  const renderRecipe = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        setSelectedRecipe(`# ${item.title}\n\n${item.description}`)
      }
    >
      <View style={styles.recipeCard}>
        <Text style={styles.recipeTitle}>{item.title}</Text>
        <Text style={styles.recipeDescription} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Receitas</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex.: Bolo de chocolate sem glúten"
        value={query}
        onChangeText={setQuery}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#ed4f27ff" />}

      {!loading && results.length === 0 && (
        <Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>
      )}

      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderRecipe}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {selectedRecipe && (
        <Recipe
          visible={!!selectedRecipe}
          onClose={() => setSelectedRecipe(null)}
          data={selectedRecipe}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 16,
  },
  input: {
    height: 48,
    borderColor: "#f6a26133",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#ed4f27ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
  recipeCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
});
