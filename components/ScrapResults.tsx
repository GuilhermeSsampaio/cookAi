import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Markdown from "react-native-markdown-display";
import Recipe from "./Recipe";

export default function ScrapResults({ data }: { data: string }) {
  const [expanded, setExpanded] = useState(false);
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);

  const handleSave = async () => {
    const res = await fetch("http://localhost:8000/save_recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipe: data }),
    });
    if (!res.ok) {
      console.error("Failed to save recipe", await res.text());
      return;
    } else {
      console.log("Recipe saved successfully", res);
    }
    if (data && !savedRecipes.includes(data)) {
      setSavedRecipes([...savedRecipes, data]);
    }
  };

  if (!data) {
    return (
      <View style={styles.empty}>
        <Markdown style={markdownStyles}>Nenhuma receita encontrada.</Markdown>
      </View>
    );
  }

  const handleCloseRecipe = () => setExpanded(false);

  return (
    <>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => setExpanded(true)}
        >
          <Feather name="maximize" size={20} color="#ed4f27ff" />
          <Text style={styles.actionText}>Expandir</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn} onPress={handleSave}>
          <Feather name="bookmark" size={20} color="#ed4f27ff" />
          <Text style={styles.actionText}>Salvar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.card}>
        <Markdown style={markdownStyles}>{data}</Markdown>
      </ScrollView>
      <Recipe visible={expanded} onClose={handleCloseRecipe} data={data} />
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginHorizontal: 16,
    marginTop: 8,
    gap: 12,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6a26133",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  actionText: {
    marginLeft: 6,
    color: "#ed4f27ff",
    fontWeight: "bold",
    fontSize: 15,
  },
  empty: {
    padding: 32,
    alignItems: "center",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed4f27ff",
  },
  modalContent: {
    flex: 1,
    padding: 16,
  },
});

const markdownStyles = {
  body: { color: "#444", fontSize: 15 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};
