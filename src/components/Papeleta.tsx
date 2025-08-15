import { useState } from "react";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Lista_cad from "./Lista_cad"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/../context/LoginContext";
import { Input } from "./ui/input";
import { pb } from "../lib/pocketbase";

type CadeteStatuses = {
  [num_nome: string]: string;
};

const Papeleta = () => {
    const { usuarioLogado } = useLogin();
    const [cadeteStatuses, setCadeteStatuses] = useState<CadeteStatuses>({});
    const [hora, setHora] = useState("");
    const [aula, setAula] = useState("FORMATURA")
    const [isSubmitting, setIsSubmitting] = useState(false);

    const faltas = Object.values(cadeteStatuses).filter(status => status && status !== "0").length;
    const em_forma = usuarioLogado?.efetivo ? Number(usuarioLogado.efetivo) - Number(faltas) : 44
    const meses = ["JAN", "FEV", "MAR", "ABR", "MAIO", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const dataAtual = new Date();
    const hoje = `${String(dataAtual.getDate()).padStart(2, "0")}/${meses[dataAtual.getMonth()]}/${dataAtual.getFullYear()}`;

    const handleSubmitPapeleta = async () => {
    if (!hora || !aula) {
      alert("Por favor, preencha a hora e a aula.");
      return;
    }
    setIsSubmitting(true);

    const papeletaData = {
      esquadrao: usuarioLogado?.esquadrao,
      esquadrilha: usuarioLogado?.username,
      data: hoje,
      hora: hora,
      aula: aula,
      efetivo: usuarioLogado?.efetivo,
      faltas: faltas,
      emForma: em_forma,
      status: "PENDENTE_CZINHO" // Status inicial
    }

    try {
      const papeletaRecord = await pb.collection('papeletas').create(papeletaData);

      const faltosos = Object.entries(cadeteStatuses)
        .filter(([_, status]) => status !== "0")
        .map(([num_nome, status]) => ({
          papeleta: papeletaRecord.id,
          num_nome: num_nome,
          status: status,
          data: hoje,
          hora: hora,
          esquadrilha: usuarioLogado?.username,
          esquadrao: usuarioLogado?.esquadrao
        }));
      
      // Envia os faltosos em um batch request
      for (const faltoso of faltosos) {
        await pb.collection('faltas').create(faltoso);
      }

      alert("Papeleta enviada com sucesso!");

      // Limpa o formulário
      setCadeteStatuses({});
      setHora("");
      setAula("FORMATURA");

    } catch (error) {
      console.error("Erro ao enviar a papeleta:", error);
      alert(`Falha ao enviar a papeleta.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="bg-yellow-200/50 backdrop-brightness-140 backdrop-blur-xs border-2 border-yellow-200/60 shadow-md shadow-yellow-200/50 transition-shadow duration-300 ease-in-out">
        <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-md">Papeleta digital </CardTitle>
            <CardDescription className="text-black text-xs">
                <p className="uppercase">TURMA {usuarioLogado?.username} </p>
            </CardDescription>
        </CardHeader>
        <div className="grid grid-cols-2 gap-2 p-2 py-0">
            <Card className="bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <CardDescription className="text-black text-sm flex flex-col mx-2">
                    <p>EFETIVO: {usuarioLogado?.efetivo}</p>
                    <p>FALTAS: {faltas}</p>
                    <p>EM FORMA: {em_forma}</p>
                </CardDescription>
            </Card>
            <Card className="bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <CardDescription className="text-black text-sm flex flex-col mx-2">
                    <p>DATA: {hoje}</p>
                    <p className="flex items-center gap-2 w-3/4">HORA: <Input type="time" value={hora} onChange={(e) => setHora(e.target.value)} /></p>
                    <p className="flex items-center gap-2 w-full">AULA: <Input type="text" value={aula} onChange={(e) => setAula(e.target.value)} required /></p>
                </CardDescription>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-2 p-2 py-0 my-0">
                <Lista_cad cadeteStatuses={cadeteStatuses} onStatusesChange={setCadeteStatuses} />
        </div>
        <CardFooter className="flex flex-col items-center m-2 p-2 rounded-md bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
            <Button onClick={handleSubmitPapeleta} disabled={!hora || isSubmitting} className="w-full bg-red-400/30 backdrop-blur-xs backdrop-brightness-110 border-2 border-red-300/40 text-black font-semibold disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSubmitting ? 'Enviando...' : 'Assinar e encaminhar para o C4'}
                </Button>
            <p>"Assinaturas" e legendas</p>
        </CardFooter>
    </Card>
  )
}

export default Papeleta