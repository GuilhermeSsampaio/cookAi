import Header from "@/components/Header";
import ScrapBar from "@/components/ScrapBar";
import ScrapResults from "@/components/ScrapResults";
import { useState } from "react";
import { Text } from "react-native";

// const BASE_URL =process.env.EXPO_PUBLIC_API_URL || "https://cookaiapiv2-8eb4v0cu.b4a.run";
const BASE_URL = "http://localhost:8000";

export default function Index() {
  const [results, setResults] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleScrap = async (link: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `${BASE_URL}/scrap?url=${encodeURIComponent(link)}`,
        {
          method: "POST",
        }
      );
      const json = await res.json();
      if (json) {
        setResults(json);
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
