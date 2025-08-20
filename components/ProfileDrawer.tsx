import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProfileDrawerProps = {
  visible: boolean;
  onClose: () => void;
};

export default function ProfileDrawer({
  visible,
  onClose,
}: ProfileDrawerProps) {
  const router = useRouter();

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.drawerOverlay}
        activeOpacity={1}
        onPress={onClose}
      />
      <View style={styles.drawer}>
        <Text style={styles.drawerTitle}>Perfil</Text>
        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push("/user");
          }}
          style={styles.drawerItem}
        >
          <Feather name="user" size={20} color="#ed4f27ff" />
          <Text style={styles.drawerText}>Meu Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            onClose();
            router.push("/settings");
          }}
          style={styles.drawerItem}
        >
          <Feather name="settings" size={20} color="#ed4f27ff" />
          <Text style={styles.drawerText}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  drawerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  drawer: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 260,
    height: "100%",
    backgroundColor: "#fff",
    paddingTop: 60,
    paddingHorizontal: 24,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: -2, height: 0 },
    shadowRadius: 8,
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#ed4f27ff",
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  drawerText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },
});
