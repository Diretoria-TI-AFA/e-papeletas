import TopMenu from "@/components/TopMenu"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { pb } from "../lib/pocketbase";
import type { RecordModel } from "pocketbase";
import { Dialog, DialogContent, DialogDescription, DialogFooter,DialogHeader,DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useLogin } from "../../context/LoginContext";
import { toast } from "sonner";


interface PapeletaPendente extends RecordModel {
  id: string;
  esquadrilha: string;
  esquadrao: string;
  data: string;
  hora: string;
  faltas: number;
  efetivo: number;
  aula: string;
  comentario_retorno?: string;
}

interface Faltoso extends RecordModel {
  num_nome: string;
  status: string;
  esquadrilha: string;
  esquadrao: string;
}

const Czinho = () => {
  const { usuarioLogado } = useLogin();
  if (!usuarioLogado || !usuarioLogado.esquadrao) {
    return <p className="text-center mt-4">Usuário não está logado ou esquadrão não definido.</p>;
  }
  const [papeletas, setPapeletas] = useState<PapeletaPendente[]>([]);
  const [loading, setLoading] = useState(true);

  const [faltosos, setFaltosos] = useState<Faltoso[]>([]);
  const [loadingFaltosos, setLoadingFaltosos] = useState(false);

const fetchPapeletas = async () => {
    setLoading(true);
    try {
      const resultList = await pb.collection('papeletas').getFullList<PapeletaPendente>({
        filter: `status = "PENDENTE_CZINHO" && esquadrao = "${usuarioLogado.esquadrao}"`,
      });
      setPapeletas(resultList);

      resultList.forEach(papeleta => {
        if (papeleta.comentario_retorno) {
          toast.warning("Papeleta Retornada pelo Czao", {
            description: papeleta.comentario_retorno,
            action: {
              label: "Ok",
              onClick: () => console.log("Notificação lida"),
            },
          });
          // Opcional: Limpa o comentário para não mostrar de novo
          pb.collection('papeletas').update(papeleta.id, { comentario_retorno: '' });
        }
      });

    } catch (error) {
      console.error("Erro ao buscar papeletas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapeletas();
  }, []);

  const handleFetchFaltosos = async (papeleta: PapeletaPendente) => {
    setLoadingFaltosos(true);
    setFaltosos([]);
    try {
      const filter = `esquadrao = "${papeleta.esquadrao}" && esquadrilha = "${papeleta.esquadrilha}" && data = "${papeleta.data}" && hora = "${papeleta.hora}"`;
      
      const resultList = await pb.collection('faltas').getFullList<Faltoso>({
        filter: filter,
      });
      
      setFaltosos(resultList);
    } catch (error) {
      console.error("Erro ao buscar faltosos:", error);
    } finally {
      setLoadingFaltosos(false);
    }
  };
  
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
                      <p><strong>Data:</strong> {p.data} - {p.hora}</p>
                      <p><strong>Faltas:</strong> {p.faltas}</p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => handleFetchFaltosos(p)}>Ver Detalhes</Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle className="uppercase text-center">Retirada de faltas da {p.esquadrilha}</DialogTitle>
                            <DialogDescription>
                              <section className="flex gap-30 my-3 w-full mx-auto justify-center">
                                <div className="text-left">
                                  <p><strong>Efetivo:</strong> {p.efetivo}</p>
                                  <p><strong>Faltas:</strong> {p.faltas}</p>
                                  <p><strong>Em Forma:</strong> {p.efetivo - p.faltas}</p>
                                </div>
                                <div className="text-left">
                                  <p><strong>Data:</strong> {p.data}</p>
                                  <p><strong>Hora:</strong> {p.hora}</p>
                                  <p><strong>Aula:</strong> {p.aula}</p>
                                </div>
                              </section>
                            </DialogDescription>
                          </DialogHeader>
                            <section>
                              <h3 className="text-center font-bold">Faltas</h3>
                              {loadingFaltosos ? (
                                  <p className="text-center">Carregando...</p>
                              ) : (
                                  faltosos.length > 0 ? (
                                      <div className="flex flex-col gap-2">
                                          {faltosos.map(f => (
                                              <div key={f.id} className="flex justify-between items-center text-sm p-1 rounded">
                                                  <span>{f.num_nome}</span>
                                                  <span className="text-slate-600 font-semibold">{f.status}</span>
                                              </div>
                                          ))}
                                      </div>
                                  ) : (
                                      <p className="text-center text-gray-500">Nenhum faltoso registrado para esta papeleta.</p>
                                  )
                              )}
                            </section>
                          <DialogFooter>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
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
