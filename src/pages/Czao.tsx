"use client";

import { useEffect, useState, type ReactElement } from "react";
import TopMenu from "@/components/TopMenu";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea"; // NOVO: Importando Textarea para o comentário
import { pb } from "../lib/pocketbase";
import type { RecordModel } from "pocketbase";

// Interfaces de tipo para os dados
interface PapeletaPendente extends RecordModel {
  id: string;
  esquadrilha: string;
  esquadrao: string;
  data: string;
  hora: string;
  faltas: number;
  efetivo: number;
  aula: string;
  comentario_retorno?: string; // Novo campo opcional para o comentário de retorno
}

interface Faltoso extends RecordModel {
  num_nome: string;
  status: string;
}

const Czao = () => {
  const [papeletas, setPapeletas] = useState<PapeletaPendente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [faltosos, setFaltosos] = useState<Faltoso[]>([]);
  const [loadingFaltosos, setLoadingFaltosos] = useState(false);
  const [comentario, setComentario] = useState("");
  const [papeletaParaRetornar, setPapeletaParaRetornar] = useState<PapeletaPendente | null>(null);

  const fetchPapeletas = async () => {
    // Definimos o loading aqui, mas não o erro, para não limpar um erro válido
    setIsLoading(true);
    try {
      const records = await pb.collection("papeletas").getFullList<PapeletaPendente>({
        filter: 'status = "PENDENTE_CZAO"',
        sort: '-created',
      });
      setPapeletas(records);
      setError(null); // Limpa qualquer erro anterior se a busca for bem-sucedida
    } catch (err: any) {
      // AQUI ESTÁ A LÓGICA PARA IGNORAR O ERRO
      if (err.isAbort) {
        console.warn("Requisição cancelada pelo React StrictMode (normal em desenvolvimento). Ignorando...");
        return; // Simplesmente para a execução se for um erro de cancelamento
      }
      
      // Se for qualquer outro erro, ele será exibido
      console.error("Erro ao buscar papeletas:", err);
      setError("Não foi possível carregar as papeletas.");
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchPapeletas();
  }, []); // Array vazio, executa apenas uma vez na montagem

  const handleFetchFaltosos = async (papeleta: PapeletaPendente) => {
    setLoadingFaltosos(true);
    setFaltosos([]);
    try {
      const filter = `esquadrao = "${papeleta.esquadrao}" && esquadrilha = "${papeleta.esquadrilha}" && data = "${papeleta.data}" && hora = "${papeleta.hora}"`;
      const resultList = await pb.collection('faltas').getFullList<Faltoso>({ filter });
      setFaltosos(resultList);
    } catch (error) {
      console.error("Erro ao buscar faltosos:", error);
    } finally {
      setLoadingFaltosos(false);
    }
  };
  
  const handleApproveAndForward = async (papeletaId: string) => {
    try {
      await pb.collection('papeletas').update(papeletaId, { status: 'PENDENTE_COMANDO' });
      alert('Papeleta aprovada e encaminhada para o Comando!');
      fetchPapeletas(); // Re-busca os dados para atualizar a lista
    } catch (error) {
      console.error("Erro ao aprovar e encaminhar:", error);
      alert('Falha ao processar a papeleta.');
    }
  };

  const handleReturnToCzinho = async () => {
    if (!papeletaParaRetornar) return;

    try {
      await pb.collection('papeletas').update(papeletaParaRetornar.id, { 
        status: 'PENDENTE_CZINHO',
        comentario_retorno: comentario, // Salva o comentário no banco
      });
      alert('Papeleta retornada para o Czinho!');
      setPapeletaParaRetornar(null); // Fecha o modal
      setComentario(""); // Limpa o campo de texto
      fetchPapeletas(); // Atualiza a lista
    } catch (error) {
      console.error("Erro ao retornar papeleta:", error);
      alert('Falha ao retornar papeleta.');
    }
  };

  const renderPapeletasPorEsquadrao = (esquadrao: string): ReactElement => {
    const papeletasFiltradas = papeletas.filter(p => p.esquadrao === esquadrao);

    if (papeletasFiltradas.length === 0) {
      return <p className="text-center text-sm text-gray-600">Nenhuma papeleta pendente para este ano.</p>;
    }

    return (
      <div className="flex flex-col gap-2 mt-4">
        {papeletasFiltradas.map(p => (
          <Card key={p.id} className="flex justify-between items-center p-3 bg-white/50">
            <div>
              <p><strong>Esquadrilha:</strong> {p.esquadrilha}</p>
              <p><strong>Data:</strong> {p.data} - {p.hora}</p>
              <p><strong>Faltas:</strong> {p.faltas}</p>
            </div>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" onClick={() => handleFetchFaltosos(p)}>Ver Detalhes</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className="uppercase text-center">Retirada de faltas da {p.esquadrilha}</DialogTitle>
                    <DialogDescription asChild>
                      <section className="flex gap-10 my-3 w-full mx-auto justify-center">
                        <div className="text-left text-black"><p><strong>Efetivo:</strong> {p.efetivo}</p><p><strong>Faltas:</strong> {p.faltas}</p><p><strong>Em Forma:</strong> {p.efetivo - p.faltas}</p></div>
                        <div className="text-left text-black"><p><strong>Data:</strong> {p.data}</p><p><strong>Hora:</strong> {p.hora}</p><p><strong>Aula:</strong> {p.aula}</p></div>
                      </section>
                    </DialogDescription>
                  </DialogHeader>
                  <section>
                    <h3 className="text-center font-bold">Faltas</h3>
                    {loadingFaltosos ? <p className="text-center">Carregando...</p> : (
                      faltosos.length > 0 ? (
                        <div className="flex flex-col gap-2">
                          {faltosos.map(f => (
                            <div key={f.id} className="flex justify-between items-center text-sm p-1 rounded">
                              <span>{f.num_nome}</span>
                              <span className="text-slate-600 font-semibold">{f.status}</span>
                            </div>
                          ))}
                        </div>
                      ) : <p className="text-center text-gray-500">Nenhum faltoso registrado.</p>
                    )}
                  </section>
                  <DialogFooter />
                </DialogContent>
              </Dialog>
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={() => setPapeletaParaRetornar(p)}
              >
                Retornar
              </Button>
              <Button size="sm" onClick={() => handleApproveAndForward(p.id)}>
                Aprovar e Encaminhar
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <section className='h-screen w-screen' style={{ backgroundImage: "url('/fundop.png')", backgroundSize: "100% auto", backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
      <header className="flex justify-center position-absolute top-0 m-0 p-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
        <div><TopMenu /></div>
      </header>
      <div className="w-auto h-auto mx-2 my-5">
        <Card className="h-full bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
          <CardTitle className="text-center text-lg font-bold m-2">Papeletas Pendentes</CardTitle>
          <CardContent>
            <Tabs defaultValue="1_ano" className="w-full">
              <TabsList className="flex w-full justify-center bg-yellow-300/60 backdrop-blur-sm border border-yellow-200/70 mb-4">
                <TabsTrigger value="1_ano">1º Ano</TabsTrigger>
                <TabsTrigger value="2_ano">2º Ano</TabsTrigger>
                <TabsTrigger value="3_ano">3º Ano</TabsTrigger>
                <TabsTrigger value="4_ano">4º Ano</TabsTrigger>
              </TabsList>
              {isLoading ? <p className="text-center">Carregando papeletas...</p> : error ? <p className="text-center text-red-500">{error}</p> : (
                <>
                  <TabsContent value="1_ano">{renderPapeletasPorEsquadrao("Perseu")}</TabsContent>
                  <TabsContent value="2_ano">{renderPapeletasPorEsquadrao("Uiraçu")}</TabsContent>
                  <TabsContent value="3_ano">{renderPapeletasPorEsquadrao("Athos")}</TabsContent>
                  <TabsContent value="4_ano">{renderPapeletasPorEsquadrao("Artemis")}</TabsContent>
                </>
              )}
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-center mt-4">
            <p className="text-black">"AD AUGUSTA PER ANGUSTA"</p>
          </CardFooter>
        </Card>
        <Dialog open={!!papeletaParaRetornar} onOpenChange={() => { setPapeletaParaRetornar(null); setComentario(""); }}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Retornar Papeleta</DialogTitle>
              <DialogDescription>
                  Descreva o motivo do retorno desta papeleta. O Czinho será notificado. (Opcional)
              </DialogDescription>
            </DialogHeader>
            <Textarea 
                placeholder="Ex: Faltou incluir a justificativa do aluno X..."
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
            />
            <DialogFooter>
                <Button variant="outline" onClick={() => { setPapeletaParaRetornar(null); setComentario(""); }}>Cancelar</Button>
                <Button variant="destructive" onClick={handleReturnToCzinho}>Confirmar Retorno</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

export default Czao;