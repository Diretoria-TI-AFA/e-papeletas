import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import type { RecordModel } from 'pocketbase';

interface Cadete extends RecordModel {
  num_nome: string;
  user: string;
  esquadrao?: string;
  esquadrilha?: string;
  acesso?: string;
  efetivo?: string;
}

export function useDadosAPI() {
  const [data, setData] = useState<Cadete[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);
          const resultList = await pb.collection('cadetes').getFullList<Cadete>({
              sort: '-created',
          });
          setData(resultList);
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