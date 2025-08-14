import TopMenu from "@/components/TopMenu"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { pb } from "../lib/pocketbase";
import type { RecordModel } from "pocketbase";


interface PapeletaPendente extends RecordModel {
  id: string;
  esquadrilha: string;
  data: string;
  hora: string;
  faltas: number;
}

const Czinho = () => {
  const [papeletas, setPapeletas] = useState<PapeletaPendente[]>([]);
  const [loading, setLoading] = useState(true);

const fetchPapeletas = async () => {
    setLoading(true);
    try {
      const resultList = await pb.collection('papeletas').getFullList<PapeletaPendente>({
        filter: 'status = "PENDENTE_CZINHO"',
      });
      setPapeletas(resultList);
    } catch (error) {
      console.error("Erro ao buscar papeletas:", error);
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    fetchPapeletas();
  }, []);
  
  const handleStatusUpdate = async (papeletaId: string, newStatus: string) => {
      try {
        await pb.collection('papeletas').update(papeletaId, { status: newStatus });
        alert(`Papeleta encaminhada para o ${newStatus === 'PENDENTE_CZAO' ? 'Czao' : 'Comando'}!`);
        fetchPapeletas(); // Re-busca os dados para atualizar a lista
      } catch (error) {
        console.error("Erro ao atualizar status:", error);
        alert('Falha ao encaminhar papeleta.');
      }
    };


  return (
    <section className='h-screen w-screen' style={{ backgroundImage: "url('/fundop.png')",backgroundSize: "100% auto",backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
      <header  className="flex justify-center position-absolute top-0 m-0 p-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
        <div>
          <TopMenu></TopMenu>
        </div>
      </header>
      <div className="w-auto h-auto mx-2 my-5">
        <Card className="h-full bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
            <CardTitle className="text-center text-lg font-bold m-0">Papeletas</CardTitle>
            <CardDescription className="text-center text-sm m-0 text-black">
                Papeletas aguardando sua verificação para encaminhar ao Czão.
            </CardDescription>
            <CardContent>
             {loading ? <p>Carregando...</p> : (
              <div className="flex flex-col gap-2 mt-4">
                {papeletas.map(p => (
                  <Card key={p.id} className="flex justify-between items-center p-3 bg-white/50">
                    <div>
                      <p><strong>Esquadrilha:</strong> {p.esquadrilha}</p>
                      <p><strong>Data:</strong> {new Date(p.data).toLocaleDateString()} - {p.hora}</p>
                      <p><strong>Faltas:</strong> {p.faltas}</p>
                    </div>
                    <div>
                      {/* TODO: Implementar um Modal para visualizar detalhes */}
                      <Button size="sm" className="mr-2">Visualizar</Button> 
                      <Button size="sm" onClick={() => handleStatusUpdate(p.id, 'PENDENTE_CZAO')}>
                        Encaminhar para Czao
                      </Button>
                    </div>
                  </Card>
                ))}
                {papeletas.length === 0 && <p className="text-center mt-4">Nenhuma papeleta pendente.</p>}
              </div>
            )}
            </CardContent>
            <CardFooter className="flex justify-center mt-4">
                <p className="text-black">"AD AUGUSTA PER ANGUSTA"</p>
            </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Czinho
