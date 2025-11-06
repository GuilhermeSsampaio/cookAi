import Header from "@/components/Header";
import RecipesList from "@/components/RecipesList";
import { useApi } from "@/hooks/useApi";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useCallback } from "react";
import { Text, View, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import ModalLogin from "@/components/ModalLogin";

export default function Book() {
  const useApiHook = useApi();
  const { isLoggedIn } = useAuth();
  const [recipes, setRecipes] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const router = useRouter();

  const getRecipes = async () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
      return;
    }
    try {
      const userData = await useApiHook.getUserData();
      const userId = userData.id;
      const response = await useApiHook.getSavedRecipes(userId);
      console.log("getrecipes", response);
      setRecipes(response || []);
      console.log("Fetched recipes:", response);
    } catch (error) {
      console.error("Failed to fetch recipes", error);
    }
  };

  // Atualiza a lista sempre que a aba "Book" for aberta
  useFocusEffect(
    useCallback(() => {
      getRecipes();
    }, [])
  );

  const handleLogin = () => {
    setShowLoginModal(false); // Fecha o modal
    router.push("/login"); // Redireciona para a tela de login
  };

  const handleCancel = () => {
    setShowLoginModal(false); // Fecha o modal
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#ed4f27ff",
          marginVertical: 10,
          marginLeft: 16,
        }}
      >
        📖 Recipes Book
      </Text>
      <RecipesList recipes={recipes} />

      {/* Modal de Login */}
      <ModalLogin
        visible={showLoginModal}
        onLogin={handleLogin}
        onCancel={handleCancel}
      />
    </View>
  );
}
