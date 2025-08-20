import Header from "@/components/Header";
import ScrapBar from "@/components/ScrapBar";
import ScrapResults from "@/components/ScrapResults";
import { useState } from "react";
import { Text } from "react-native";

export default function Index() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleScrap = async (link: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://api-receitas-pi.vercel.app/receitas/todas"
      );
      const json = await res.json();
      // Mapeia os dados para o formato esperado pelo ScrapResults
      const data = (json.items || []).map((item: any) => ({
        id: item.id,
        titulo: item.receita,
        ingredientes:
          item.IngredientesBase?.[0]?.nomesIngrediente ||
          item.ingredientes.split(",").map((i: string) => i.trim()),
        preparo: item.modo_preparo,
        imagem: item.link_imagem,
      }));
      setResults(data);
    } catch (e) {
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <>
      <Header />
      <ScrapBar onScrap={handleScrap} />
      {loading ? (
        <Text style={{ textAlign: "center", marginTop: 32 }}>
          Carregando...
        </Text>
      ) : (
        <ScrapResults data={results} />
      )}
    </>
  );
}
