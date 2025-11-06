import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginScreen() {
  const { loginContext } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const useApiHook = useApi();

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Erro",
        text2: "Todos os campos são obrigatórios.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await useApiHook.loginUser({
        email,
        password,
      });

      // Salva o usuário no contexto
      await loginContext(response);

      Toast.show({
        type: "success",
        text1: "Login realizado com sucesso!",
      });
      router.push("/"); // Redireciona para a página inicial
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Erro ao fazer login",
        text2: "Credenciais inválidas. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/register")}
        style={styles.registerLink}
      >
        <Text style={styles.registerText}>
          Não tem uma conta?{" "}
          <Text style={styles.registerTextBold}>Registre-se</Text>
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
  button: {
    backgroundColor: "#ed4f27ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: "#f6a261ff",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerLink: {
    marginTop: 16,
    alignItems: "center",
  },
  registerText: {
    fontSize: 14,
    color: "#656060ff",
  },
  registerTextBold: {
    fontWeight: "bold",
    color: "#ed4f27ff",
  },
});
