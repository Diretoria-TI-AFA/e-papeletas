import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import { useLogin } from '../../context/LoginContext';
import { ClientResponseError } from 'pocketbase';

interface FaltaTime {
  hora: string;
}

export function usePapeletaHorarios() {
  const { usuarioLogado } = useLogin();
  const [horarios, setHorarios] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchHorarios = async () => {
      if (!usuarioLogado || !usuarioLogado.esquadrao) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      const today = new Date();
      const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      
      const day = String(today.getDate()).padStart(2, '0');
      const month = meses[today.getMonth()]; // Pega a abreviação do mês
      const year = today.getFullYear();
      
      const todayStr = `${day}/${month}/${year}`;

      const filterStr = `esquadrao = "${usuarioLogado.esquadrao}" && data ~ "${todayStr}"`;
      console.log("Filtro final enviado para o PocketBase:", filterStr);
      
      try {
        const resultList = await pb.collection('faltas').getFullList({
          filter: filterStr,
          fields: 'hora',
        });

        const uniqueHorarios = [...new Set(resultList.map(item => item.hora))];
        uniqueHorarios.sort((a, b) => b.localeCompare(a));
        
        setHorarios(uniqueHorarios);

      } catch (e: any) {
         if (e instanceof ClientResponseError && e.isAbort) {
          console.log("Request was aborted by React StrictMode.");
        } else {
          console.error("Erro detalhado em usePapeletaHorarios:", e);
          setError(new Error("Falha ao buscar horários. Verifique o console (F12)."));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHorarios();
  }, [usuarioLogado]);

  return { horarios, loading, error };
}