import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";

interface ModalLoginProps {
  visible: boolean; // Controla a visibilidade do modal
  onLogin: () => void; // Função chamada ao clicar em "Fazer Login"
  onCancel: () => void; // Função chamada ao clicar em "Cancelar"
}

export default function ModalLogin({
  visible,
  onLogin,
  onCancel,
}: ModalLoginProps) {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>
            Você precisa estar logado para acessar suas receitas salvas.
          </Text>
          <TouchableOpacity style={styles.loginButton} onPress={onLogin}>
            <Text style={styles.loginButtonText}>Fazer Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    alignItems: "center",
  },
  modalText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: "#ed4f27ff",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 8,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#ed4f27ff",
    fontSize: 14,
  },
});
