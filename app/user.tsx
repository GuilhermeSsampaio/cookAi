import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";

export default function UserScreen() {
  // const { logoutUser } = useApi();
  const { logoutContext } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    // await logoutUser(); // Remove os dados do AsyncStorage
    await logoutContext(); // Atualiza o estado de autenticação
    router.replace("/login"); // Redireciona para a tela de login
  };

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

      {/* Botão de Logout */}
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
