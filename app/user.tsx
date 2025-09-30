import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";

export default function UserScreen() {
  const { user, logoutContext } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logoutContext();
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/149/149071.png", // avatar blank
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.username || "Usuário"}</Text>
      <Text style={styles.email}>{user?.email || ""}</Text>
      <Text style={styles.label}>Sobre:</Text>
      <Text style={styles.about}>
        Apaixonado por culinária e tecnologia. Adora testar novas receitas e
        compartilhar conhecimento!
      </Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>
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
  logoutButton: {
    marginTop: 32,
    backgroundColor: "#ed4f27ff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
