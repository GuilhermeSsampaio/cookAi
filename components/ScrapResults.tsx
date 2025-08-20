import { FlatList, Image, StyleSheet, Text, View } from "react-native";

type Recipe = {
  id: number;
  titulo: string;
  ingredientes: string[];
  preparo: string;
  imagem: string;
};

export default function ScrapResults({ data }: { data: Recipe[] }) {
  if (!data.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhuma receita encontrada.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          {item.imagem ? (
            <Image source={{ uri: item.imagem }} style={styles.image} />
          ) : null}
          <Text style={styles.title}>{item.titulo}</Text>
          <Text style={styles.subtitle}>Ingredientes:</Text>
          <Text style={styles.body}>{item.ingredientes.join(", ")}</Text>
          <Text style={styles.subtitle}>Preparo:</Text>
          <Text style={styles.body}>{item.preparo}</Text>
        </View>
      )}
      contentContainerStyle={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 160,
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 4,
  },
  subtitle: {
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 2,
    color: "#43e97b",
  },
  body: {
    color: "#444",
    fontSize: 14,
  },
  empty: {
    padding: 32,
    alignItems: "center",
  },
  emptyText: {
    color: "#888",
  },
});
