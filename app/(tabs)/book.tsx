import React from "react";
import { Text, View } from "react-native";

export default function book() {
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Recipes Book</Text>
      <Text>Here you can save your favorite recipes.</Text>
      {/* You can add more functionality here, like a list of saved recipes */}
      <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>
        More features coming soon!
      </Text>
    </View>
  );
}
