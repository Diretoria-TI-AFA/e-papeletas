// src/pages/FaltasDescriminadas.tsx

import { useState, useEffect } from 'react';
import { TopMenu } from '@/components/TopMenu.tsx';
import { Card } from "@/components/ui/card";
import { usePapeletaHorarios } from '@/hooks/usePapeletasHorarios';
import { useFaltasData } from '@/hooks/useFaltasData';
import type { EsquadrilhaStats } from '@/hooks/useFaltasData';

// Componente auxiliar para renderizar a lista de faltas (sem alterações)
const renderDescriminadas = (stats: EsquadrilhaStats) => {
  const statusKeys: Array<keyof EsquadrilhaStats> = [
    'AGD', 'ATL', 'BXD', 'CON', 'DPM', 'EME', 'EVV', 'FIS', 'GUI', 'LID', 'ODO', 
    'OSP', 'SVC', 'SVS', 'VGM', 'VOO'
  ];
  const faltasOcorridas = statusKeys
    .filter(key => stats[key] > 0)
    .map(key => <p key={key}>{key}: {stats[key]}</p>);
  
  return faltasOcorridas.length > 0 
    ? faltasOcorridas 
    : <p className='flex justify-center text-gray-500 italic text-center'>Zero faltas</p>;
};


const FaltasDescriminadas = () => {
  // ===================================================================
  // IMPORTANTE: Todos os hooks são chamados aqui no topo, sem condições.
  // ===================================================================
  const { horarios, loading: loadingHorarios, error: errorHorarios } = usePapeletaHorarios();
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const { stats, loading: loadingStats, error: errorStats } = useFaltasData(selectedTime);

  // Efeito para selecionar o horário mais recente automaticamente
  useEffect(() => {
    if (horarios.length > 0 && !selectedTime) {
      setSelectedTime(horarios[0]);
    }
  }, [horarios, selectedTime]);

  const handleTimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTime(event.target.value);
  };

  return (
    <section className='h-screen w-screen' style={{ backgroundImage: "url('/fundop.png')",backgroundSize: "100% auto",backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
      <header className="flex justify-center position-absolute top-0 m-0 p-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
        <div><TopMenu /></div>
      </header>

      <div className="w-auto mx-2 flex flex-col items-center">
        <div className="w-full my-4 rounded-lg bg-yellow-200/40 backdrop-blur-xs border border-yellow-200/50 shadow-md shadow-yellow-200/30">
          <h1 className="text-black text-2xl font-bold text-center p-4 w-full m-2">Visualizar Papeleta de Faltas</h1>
          
          <div className="p-2 mx-2">
            <label htmlFor="time-selector" className="block text-sm font-medium text-gray-700 mb-1">
              Selecione a Papeleta:
            </label>
            <select
              id="time-selector"
              value={selectedTime || ''}
              onChange={handleTimeChange}
              disabled={loadingHorarios || horarios.length === 0}
              className="w-full p-2 border border-gray-300 rounded-md"
            >
              {loadingHorarios ? (
                <option>Carregando horários...</option>
              ) : horarios.length > 0 ? (
                horarios.map(hora => <option key={hora} value={hora}>Papeleta das {hora}</option>)
              ) : (
                <option>Nenhuma papeleta registrada hoje</option>
              )}
            </select>
          </div>

          {(errorHorarios || errorStats) && (
            <div className="text-center p-4 m-2 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <strong>Erro:</strong> {errorHorarios?.message || errorStats?.message}
            </div>
          )}
          
          {loadingStats && <p className="text-center p-4">Carregando dados da papeleta...</p>}
          
          {stats && !loadingStats && (
            <>
              <Card className="p-2 my-2 mx-2 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <div className='flex flex-col items-center justify-center'>
                  <div>
                  <h1 className='text-3xl text-left'><strong>Em forma:</strong> {stats.total.emForma}</h1>
                  <p className='text-3xl text-left'><strong>Faltas:</strong> {stats.total.faltas}</p>
                  </div>
                </div>
                <div>
                  <p className='text-center border-b font-semibold mt-2 mb-1'>Descriminadas (Total)</p>
                  <p className='flex gap-2'>
                    {renderDescriminadas(stats.total)}
                  </p>
                </div>
              </Card>
              
              <div className="grid grid-cols-2 gap-2 p-2">
                {Object.entries(stats.esquadrilhas).map(([nome, dados]) => (
                  <Card key={nome} className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                    <div>
                      <h1 className="font-bold text-lg">{nome}</h1>
                      <p><strong>Faltas:</strong> {dados.faltas}</p>
                      <p><strong>Em Forma:</strong> {dados.emForma}</p>
                      <p className='text-center border-b font-semibold mt-2 mb-1'>Descriminadas</p>
                      <p className='flex gap-2'>
                        {renderDescriminadas(dados)}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default FaltasDescriminadas;