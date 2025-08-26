import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function ScrapBar({
  onScrap,
}: {
  onScrap?: (text: string) => void;
}) {
  const [inputText, setInputText] = useState("");

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Cole o link da receita aqui..."
        value={inputText}
        onChangeText={setInputText}
        placeholderTextColor="#656060ff"
        underlineColorAndroid="transparent" // remove underline no Android
        selectionColor="#ef9744ff" // opcional: cor do cursor
      />
      <TouchableOpacity
        onPress={() => onScrap?.(inputText)}
        style={styles.iconButton}
      >
        <Feather name="search" size={24} color="#ef9744ff" />
      </TouchableOpacity>
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
    outlineWidth: 0, // <-- Adicione esta linha para web
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
});
