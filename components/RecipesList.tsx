import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import Recipe from "./Recipe";

export default function RecipesList() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const get_recipes = async () => {
    try {
      const response = await fetch("http://localhost:8000/saved_recipes");
      const json = await response.json();
      setData(json);
    } catch (e) {
      console.error("Failed to fetch recipes", e);
      setData([]);
    }
  };
  useEffect(() => {
    get_recipes();
  }, []);

  const handleCloseRecipe = () => {
    setExpanded(false);
    setSelectedRecipe(null);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedRecipe(item.content);
        setExpanded(true);
      }}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        {item.created_at ? new Date(item.created_at).toLocaleDateString() : ""}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhuma receita salva.</Text>
          </View>
        }
        showsVerticalScrollIndicator={false}
      />
      <Recipe
        visible={expanded}
        onClose={handleCloseRecipe}
        data={selectedRecipe}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#ed4f27",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: "#f6a26133",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27",
    marginBottom: 4,
  },
  date: {
    fontSize: 13,
    color: "#888",
  },
  empty: {
    alignItems: "center",
    marginTop: 48,
  },
  emptyText: {
    color: "#aaa",
    fontSize: 16,
  },
});
