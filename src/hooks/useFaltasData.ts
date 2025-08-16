import { useState, useEffect } from 'react';
import { pb } from '../lib/pocketbase';
import type { RecordModel } from 'pocketbase';
import { useLogin } from '../../context/LoginContext';

// ==================================
// INTERFACES E TIPOS DE DADOS
// ==================================

interface Efetivo extends RecordModel {
  esquadrao: string;
  esquadrilha: string;
  efetivo: number;
}

interface Falta extends RecordModel {
  esquadrilha: string;
  status: string; // Ex: 'DPM', 'ATL', 'VGM', etc.
  data: string;   // Campo de data no PocketBase (YYYY-MM-DD)
  hora: string;   // Campo de texto para a hora do registro ("HH:mm")
}

export interface EsquadrilhaStats {
  efetivo: number;
  faltas: number;
  emForma: number;
  AGD: number; ATL: number; BXD: number; CON: number; DPM: number; EME: number;
  EVV: number; FIS: number; GUI: number; LID: number; ODO: number; OSP: number;
  SVC: number; SVS: number; VGM: number; VOO: number;
}

export interface AllStats {
  total: EsquadrilhaStats;
  esquadrilhas: Record<string, EsquadrilhaStats>;
}

// ==================================
// CONSTANTES E FUNÇÕES AUXILIARES
// ==================================

const NOME_ESQUADRILHAS = ["Alfa", "Bravo", "Charlie", "Delta", "Echo", "Fox"];
const createEmptyStats = (): EsquadrilhaStats => ({
  efetivo: 0, faltas: 0, emForma: 0, AGD: 0, ATL: 0, BXD: 0, CON: 0, DPM: 0, 
  EME: 0, EVV: 0, FIS: 0, GUI: 0, LID: 0, ODO: 0, OSP: 0, SVC: 0, 
  SVS: 0, VGM: 0, VOO: 0,
});

const formatarNomeEsquadrilha = (nome: string) => {
  if (!nome) return '';
  return nome.charAt(0).toUpperCase() + nome.slice(1).toLowerCase();
};


// ==================================
// O HOOK CUSTOMIZADO
// ==================================

/**
 * Busca e processa os dados de uma papeleta de faltas específica.
 * @param time A hora exata da papeleta a ser buscada (formato "HH:mm"), ou null se nenhuma estiver selecionada.
 */
export function useFaltasData(time: string | null) {
  const { usuarioLogado } = useLogin();
  const [stats, setStats] = useState<AllStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!time || !usuarioLogado || !usuarioLogado.esquadrao) {
        setStats(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      const today = new Date();
      const meses = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
      const day = String(today.getDate()).padStart(2, '0');
      const month = meses[today.getMonth()];
      const year = today.getFullYear();
      const todayStr = `${day}/${month}/${year}`;

      try {
        // =========================================================
        // MUDANÇA PRINCIPAL AQUI
        // =========================================================
        // Em vez de buscar de 'cadetes', buscamos de 'efetivos' e 'faltas'.
        const [efetivosList, faltasList] = await Promise.all([
          // 1. Busca os registros de efetivo para o esquadrão do usuário
          pb.collection('efetivos').getFullList<Efetivo>({
            filter: `esquadrao = "${usuarioLogado.esquadrao}"`
          }),
          // 2. Busca as faltas da papeleta selecionada (isso continua igual)
          pb.collection('faltas').getFullList<Falta>({
            filter: `esquadrao = "${usuarioLogado.esquadrao}" && data = "${todayStr}" && hora = "${time}"`
          })
        ]);
        // =========================================================

        const initialStats: AllStats = {
          total: createEmptyStats(),
          esquadrilhas: {},
        };
        NOME_ESQUADRILHAS.forEach(nome => {
          initialStats.esquadrilhas[nome] = createEmptyStats();
        });
        // Atribui o efetivo usando a nova formatação
        efetivosList.forEach(efetivoItem => {
          // --- CORREÇÃO AQUI ---
          const esquadrilhaNome = formatarNomeEsquadrilha(efetivoItem.esquadrilha);
          if (initialStats.esquadrilhas[esquadrilhaNome]) {
            initialStats.esquadrilhas[esquadrilhaNome].efetivo = efetivoItem.efetivo;
          }
        });

        // Conta as faltas usando a nova formatação
        faltasList.forEach(falta => {
          // --- CORREÇÃO AQUI ---
          const esquadrilhaNome = formatarNomeEsquadrilha(falta.esquadrilha);
          const esquadrilhaStats = initialStats.esquadrilhas[esquadrilhaNome];

          if (esquadrilhaStats) {
            esquadrilhaStats.faltas += 1;
            const statusKey = falta.status.toUpperCase() as keyof EsquadrilhaStats; // Status continua sendo maiúsculo
            if (statusKey in esquadrilhaStats) {
              esquadrilhaStats[statusKey] = (esquadrilhaStats[statusKey] || 0) + 1;
            }
          }
        });
        
        // A totalização agora funcionará corretamente
        Object.values(initialStats.esquadrilhas).forEach(esqStats => {
            esqStats.emForma = esqStats.efetivo - esqStats.faltas;
            (Object.keys(esqStats) as Array<keyof EsquadrilhaStats>).forEach(key => {
                initialStats.total[key] += esqStats[key];
            });
        });
        
        setStats(initialStats);

      } catch (e: any) {
        // ... (bloco catch)
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [time, usuarioLogado]);

  return { stats, loading, error };
}