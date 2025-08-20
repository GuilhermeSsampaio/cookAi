import { Image, StyleSheet, Text, View } from "react-native";

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
        style={styles.avatar}
      />
      <Text style={styles.name}>João da Silva</Text>
      <Text style={styles.email}>joao@email.com</Text>
      <Text style={styles.label}>Sobre:</Text>
      <Text style={styles.about}>
        Apaixonado por culinária e tecnologia. Adora testar novas receitas e
        compartilhar conhecimento!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 32,
    backgroundColor: "#fff",
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: "#888",
    marginBottom: 16,
  },
  label: {
    fontWeight: "bold",
    marginTop: 16,
    alignSelf: "flex-start",
  },
  about: {
    fontSize: 15,
    color: "#444",
    marginTop: 4,
    textAlign: "left",
    alignSelf: "flex-start",
  },
});
