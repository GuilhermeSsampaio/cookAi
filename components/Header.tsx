import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function Header() {
  return (
    <LinearGradient
      colors={["#ed4f27ff", "#f6a261ff"]}
      style={styles.header}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
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
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 48,
    paddingBottom: 32,
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
