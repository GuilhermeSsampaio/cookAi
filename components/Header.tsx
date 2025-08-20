import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import ProfileDrawer from "./ProfileDrawer";

export default function Header() {
  const [drawerVisible, setDrawerVisible] = useState(false);

  return (
    <>
      <LinearGradient
        colors={["#ed4f27ff", "#f6a261ff"]}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <TouchableOpacity
          style={styles.profileBtn}
          onPress={() => setDrawerVisible(true)}
        >
          <Feather name="user" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>CookAi</Text>
        <Text style={styles.text}>Bem vindo ao CookAi!</Text>
        <Text style={styles.text}>
          Salve suas receitas e se livre de anuncios
        </Text>
        <Text style={styles.text}>
          Não perca tempo, copie o link da receita e cole aqui
        </Text>
        <Text style={styles.text}>E a mágica acontece!</Text>
      </LinearGradient>
      <ProfileDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
    position: "relative",
  },
  profileBtn: {
    position: "absolute",
    top: 52,
    right: 24,
    zIndex: 2,
    backgroundColor: "rgba(0,0,0,0.15)",
    borderRadius: 20,
    padding: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 8,
  },
});
