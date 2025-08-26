import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import Markdown from "react-native-markdown-display";
import { Feather } from "@expo/vector-icons";

export default function Recipe({ visible, onClose, data }) {
  console.log("Recipe data:", data);
  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={() => onClose()}>
            <Feather name="x" size={28} color="#ed4f27ff" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Receita Completa</Text>
          <View style={{ width: 28 }} /> {/* Espaço para alinhar o título */}
        </View>
        <ScrollView style={styles.modalContent}>
          <Markdown style={markdownStyles}>{data}</Markdown>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const markdownStyles = {
  body: { color: "#444", fontSize: 15 },
  heading2: { color: "#ed4f27ff", fontSize: 20, marginTop: 12 },
  strong: { fontWeight: "bold", color: "#ed4f27ff" },
};

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
