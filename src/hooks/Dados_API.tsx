import { useState, useEffect } from 'react';

const API_URL = 'https://script.google.com/macros/s/AKfycbwlGhgawQinYaxYqZQIYRW2PZEgYfMXO1PgYcIGYD54IDpdf4PNAyRI8wqTw5XXKNF0/exec';

interface PlanilhaItem {
  num_nome: string;
  esquadrilha: string;
}
export function useDadosAPI() {
  const [data, setData] = useState<PlanilhaItem[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Erro na resposta da API: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (e: any) {
        setError(e);
        console.error("Falha ao buscar dados da API", e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, []); 
  return { data, loading, error };
}