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

export default function Search() {
  const [query, setQuery] = useState(""); // Entrada do usuário
  const [loading, setLoading] = useState(false); // Indicador de carregamento
  const [results, setResults] = useState([]); // Resultados da busca
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
      setResults(response.recipes || []);
    } catch (error) {
      console.error("Erro ao buscar receitas:", error);
      alert("Não foi possível buscar receitas. Tente novamente mais tarde.");
    } finally {
      setLoading(false);
    }
  };

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

      {/* <FlatList
        data={results.length > 0 ? results : [exampleRecipe]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.recipeCard}>
            <Text style={styles.recipeTitle}>{item.title}</Text>
            <Text style={styles.recipeDescription}>
              {item.description || "Sem descrição disponível."}
            </Text>
          </View>
        )} */}
          <Text style={styles.recipeDescription}>
              {{results}}
            </Text>
        ListEmptyComponent={
          !loading && (
            <Text style={styles.emptyText}>
              Nenhuma receita encontrada. Tente outra busca.
            </Text>
          )
        }
      />
    </View>
  );
}

// Exemplo de receita retornada pelo modelo
const exampleRecipe = {
  title: "Bolo de Fubá Sem Leite",
  description:
    "Um bolo de fubá delicioso e sem leite, perfeito para quem busca uma opção mais leve e saborosa. Confira a receita completa!",
};

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
  recipeCard: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#f6a26133",
    borderRadius: 8,
    marginBottom: 16,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  recipeDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 8,
  },
  emptyText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
    marginTop: 32,
  },
});
