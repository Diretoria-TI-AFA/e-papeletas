import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import type { RecordModel } from 'pocketbase';
// Importe o tipo do erro do PocketBase se disponível, ou use `any`
import { ClientResponseError } from 'pocketbase';

interface Cadete extends RecordModel {
  num_nome: string;
  esquadrao: string;
  esquadrilha: string;
}

export function useDadosAPI() {
  const [data, setData] = useState<Cadete[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // A função de limpeza retornada pelo useEffect irá lidar com o cancelamento
    let isCancelled = false;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null); // Limpa erros anteriores a cada nova busca
        const resultList = await pb.collection('Cadetes').getFullList<Cadete>({
          sort: '-created',
        });
        
        // Só atualiza o estado se o componente ainda estiver montado
        if (!isCancelled) {
          setData(resultList);
        }

      } catch (e: any) {
        // Ignora o erro se for um erro de cancelamento
        if (e instanceof ClientResponseError && e.isAbort) {
          console.log("Request was aborted, this is expected during development with StrictMode.");
          return; // Não faz nada, pois foi intencional
        }
        
        // Se for qualquer outro erro, define o estado de erro
        if (!isCancelled) {
            setError(e);
            console.error("Falha ao buscar dados da API", e);
        }

      } finally {
        if (!isCancelled) {
            setLoading(false);
        }
      }
    };

    fetchData();

    // Esta é a função de limpeza. Ela será chamada quando o componente for desmontado.
    return () => {
      isCancelled = true;
    };
    
  }, []); // O array de dependências vazio está correto

  return { data, loading, error };
}