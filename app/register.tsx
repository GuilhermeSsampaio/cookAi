import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Switch,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useApi } from "@/hooks/useApi";

export default function RegisterScreen() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const useApiHook = useApi();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Todos os campos são obrigatórios.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await useApiHook.createUser({
        username,
        email,
        password: password,
        // is_premium: isPremium,
      });
      Toast.show({
        type: "success",
        text1: "Usuário registrado com sucesso!",
      });
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao registrar",
        text2: "Tente novamente mais tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrar</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome de usuário"
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#656060ff"
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="#656060ff"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#656060ff"
      />

      <TouchableOpacity
        style={[styles.button, loading && styles.buttonDisabled]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Registrando..." : "Registrar"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ed4f27ff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 48,
    borderColor: "#f6a26133",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: "#333",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  button: {
    backgroundColor: "#ed4f27ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#f6a261ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
//  <View style={styles.switchContainer}>
//       <Text style={styles.switchLabel}>Conta Premium</Text>
//       <Switch
//         value={isPremium}
//         onValueChange={setIsPremium}
//         thumbColor={isPremium ? "#ed4f27ff" : "#ccc"}
//       />
//     </View>
