import { Feather } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScrapBar({
  onScrap,
}: {
  onScrap?: (text: string) => void;
}) {
  const [inputText, setInputText] = useState("");
  const [recentLinks, setRecentLinks] = useState<string[]>([]);
  const [showRecentLinks, setShowRecentLinks] = useState(false);

  // Carregar links recentes do AsyncStorage ao montar o componente
  useEffect(() => {
    (async () => {
      try {
        const storedLinks = await AsyncStorage.getItem("recentLinks");
        if (storedLinks) {
          setRecentLinks(JSON.parse(storedLinks));
        }
      } catch (error) {
        console.error("Erro ao carregar links recentes:", error);
      }
    })();
  }, []);

  // Função para salvar o link pesquisado
  const handleSearch = async () => {
    if (inputText.trim() === "") return;

    try {
      const updatedLinks = [
        inputText,
        ...recentLinks.filter((link) => link !== inputText),
      ].slice(0, 4); // Limita a 4 links
      setRecentLinks(updatedLinks);
      await AsyncStorage.setItem("recentLinks", JSON.stringify(updatedLinks));
      onScrap?.(inputText);
      setInputText(""); // Limpa o campo de entrada
    } catch (error) {
      console.error("Erro ao salvar link:", error);
    }
  };

  return (
    <View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Cole o link da receita aqui..."
          value={inputText}
          onChangeText={setInputText}
          onFocus={() => setShowRecentLinks(true)} // Mostrar links recentes ao focar
          placeholderTextColor="#656060ff"
          underlineColorAndroid="transparent"
          selectionColor="#ef9744ff"
        />
        <TouchableOpacity onPress={handleSearch} style={styles.iconButton}>
          <Feather name="search" size={24} color="#ef9744ff" />
        </TouchableOpacity>
      </View>
      {/* Exibir links recentes */}
      {showRecentLinks && recentLinks.length > 0 && (
        <View style={styles.recentLinksContainer}>
          <FlatList
            data={recentLinks}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={({ item }) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  setInputText(item);
                  setShowRecentLinks(false);
                }}
              >
                <View style={styles.recentLinkItem}>
                  <Text style={styles.recentLinkText}>{item}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6d9d9ff",
    borderRadius: 24,
    paddingHorizontal: 16,
    margin: 16,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: "#333",
    outlineWidth: 0,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
  recentLinksContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 16,
    padding: 8,
    elevation: 2,
  },
  recentLinkItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  recentLinkText: {
    fontSize: 14,
    color: "#333",
  },
});
