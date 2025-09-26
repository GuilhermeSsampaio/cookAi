import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

interface AuthContextType {
  user: any;
  loginContext: (userData: any) => Promise<void>;
  logoutContext: () => Promise<void>;
  isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Carrega o estado de login do AsyncStorage ao iniciar o app
    const loadUser = async () => {
      const storedUser = await AsyncStorage.getItem("userData");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
        setIsLoggedIn(true);
      }
    };
    loadUser();
  }, []);

  const loginContext = async (userData: any) => {
    await AsyncStorage.setItem("userData", JSON.stringify(userData));
    setUser(userData);
    setIsLoggedIn(true);
  };

  const logoutContext = async () => {
    await AsyncStorage.removeItem("userData");
    Toast.show({
      type: "success",
      text1: "Logout realizado com sucesso",
    });
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, loginContext, logoutContext, isLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
