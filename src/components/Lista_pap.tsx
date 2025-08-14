import { useMemo } from 'react';
import CadeteCard from './CadeteCard';
import { useDadosAPI } from '../hooks/Dados_API';
import { useLogin } from "@/../context/LoginContext";; 

type CadeteStatuses = {
  [esquadsr: string]: string;
};

interface ListaCadProps {
  cadeteStatuses: CadeteStatuses;
  onStatusesChange: (statuses: CadeteStatuses) => void;
}

const Lista_pap = ({ cadeteStatuses, onStatusesChange }: ListaCadProps) => {
  const { data: todosOsCadetes, loading, error } = useDadosAPI();
  const { usuarioLogado } = useLogin();
  
  const cadetesFiltrados = useMemo(() => {
    if (!todosOsCadetes || !usuarioLogado?.esquadrilha) {
      return [];
    }  
    return todosOsCadetes.filter(
      (cadete) => cadete.esquadrilha === usuarioLogado.esquadrilha
    );
  }, [todosOsCadetes, usuarioLogado]);

  const handleStatusChange = (num_nome: string, status: string) => {
    onStatusesChange({
      ...cadeteStatuses,
      [num_nome]: status,
    });
  };

  if (loading) return <p className="text-center p-4">Carregando cadetes...</p>;
  if (error) return <p className="text-center text-red-500 p-4">Erro ao carregar dados.</p>;
  if (!usuarioLogado) return <p className="text-center p-4">Usuário não logado.</p>

  return (
    <div className="w-full flex flex-col gap-2 p-4">
      {cadetesFiltrados.length > 0 ? (
        cadetesFiltrados.map((cadete) => (
          <CadeteCard 
          key={cadete.num_nome} 
          cad={cadete}
          status={cadeteStatuses[cadete.num_nome] || '0'}
          onStatusChange={(status) => handleStatusChange(cadete.num_nome, status)}
          />
        ))
      ) : (
        <p className="text-center text-gray-500">
          Nenhum cadete encontrado para a sua esquadrilha.
        </p>
      )}
    </div>
  );
};

export default Lista_pap;