import Header from "@/components/Header";
import ScrapBar from "@/components/ScrapBar";
import ScrapResults from "@/components/ScrapResults";
import { useApi } from "@/hooks/useApi";
import { useState } from "react";
import { Text } from "react-native";

export default function Index() {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const useApiHook = useApi();

  const handleScrap = async (link: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await useApiHook.scrapRecipe(link);
      if (response) {
        setResults(response);
      } else {
        setResults("Nenhum dado encontrado.");
      }
    } catch (e) {
      setError("Ocorreu um erro ao buscar os dados." + e);
      setResults("");
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
      ) : error ? (
        <Text style={{ textAlign: "center", marginTop: 32, color: "red" }}>
          {error}
        </Text>
      ) : (
        <ScrapResults data={results || ""} />
      )}
    </>
  );
}
