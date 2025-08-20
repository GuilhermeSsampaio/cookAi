import React from "react";
import { Text, View } from "react-native";

export default function Search() {
  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Search</Text>
      <Text>Here you can search for recipes.</Text>
      <Text style={{ fontSize: 16, color: "gray", marginTop: 10 }}>
        More features coming soon!
      </Text>
    </View>
  );
}
