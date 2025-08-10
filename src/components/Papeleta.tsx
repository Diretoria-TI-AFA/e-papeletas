import { useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Papa from "papaparse";
import {Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Lista_cad from "./Lista_cad"
import { Button } from "@/components/ui/button"
import { useLogin } from "@/../context/LoginContext";
import { Input } from "./ui/input";

type CadeteStatuses = {
  [num_nome: string]: string;
};

const Papeleta = () => {
    const { usuarioLogado } = useLogin();
    const [cadeteStatuses, setCadeteStatuses] = useState<CadeteStatuses>({});
    const [hora, setHora] = useState("");
    const faltas = Object.values(cadeteStatuses).filter(status => status && status !== "0").length;
    const em_forma = usuarioLogado?.efetivo ? Number(usuarioLogado.efetivo) - Number(faltas) : 44
    const meses = ["JAN", "FEV", "MAR", "ABR", "MAIO", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
    const dataAtual = new Date();
    const hoje = `${String(dataAtual.getDate()).padStart(2, "0")}/${meses[dataAtual.getMonth()]}/${dataAtual.getFullYear()}`;

    const handleExport = () => {
        const faltosos = Object.entries(cadeteStatuses)
            .filter(([_, status]) => status !== "0")
            .map(([num_nome, status]) => ({ num_nome, status }));

        const nomedoArquivoBase = `Papeleta_${usuarioLogado?.user || 'turma'}_${hoje.replace(/\//g, '-')}`;

        const doc = new jsPDF();
            doc.text(`Papeleta da Turma: ${usuarioLogado?.user || 'N/A'}`, 14, 20);
            doc.setFontSize(11);
            doc.text(`Data: ${hoje}`, 14, 30);
            doc.text(`Hora: ${hora || 'Não definida'}`, 70, 30);
            doc.text(`Efetivo: ${usuarioLogado?.efetivo || 'N/A'}`, 14, 37);
            doc.text(`Faltas: ${faltas}`, 70, 37);
            doc.text(`Em Forma: ${em_forma}`, 130, 37);
            
            autoTable(doc, {
            startY: 45,
            head: [['Nº/Nome do Cadete', 'Situação']],
            body: faltosos.map(f => [f.num_nome, f.status]),
            theme: 'grid',
            headStyles: { fillColor: [220, 53, 69] }, // Cor vermelha para o cabeçalho
        });
        doc.save(`${nomedoArquivoBase}.pdf`);

        const csvData = faltosos.map(f => ({
            "Nome do Cadete": f.num_nome,
            "Situacao": f.status,
            "Turma": usuarioLogado?.user,
            "Data": hoje,
            "Hora": hora
        }));

        const csv = Papa.unparse(csvData);
        const blob = new Blob([`\uFEFF${csv}`], { type: 'text/csv;charset=utf-8;' }); // \uFEFF para compatibilidade com Excel
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', `${nomedoArquivoBase}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


  return (
    <Card className="bg-yellow-200/50 backdrop-brightness-140 backdrop-blur-xs border-2 border-yellow-200/60 shadow-md shadow-yellow-200/50 transition-shadow duration-300 ease-in-out">
        <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center text-md">Papeleta digital </CardTitle>
            <CardDescription className="text-black text-xs">
                <p className="uppercase">TURMA {usuarioLogado?.user} </p>
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
                    <p>AULA: FORMATURA</p>
                </CardDescription>
            </Card>
        </div>
        <div className="grid grid-cols-1 gap-2 p-2 py-0 my-0">
                <Lista_cad cadeteStatuses={cadeteStatuses} onStatusesChange={setCadeteStatuses} />
        </div>
        <CardFooter className="flex flex-col items-center m-2 p-2 rounded-md bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
            <Button onClick={handleExport} className="w-full bg-red-400/30 backdrop-blur-xs backdrop-brightness-110 border-2 border-red-300/40 text-black font-semibold">Assinar e encaminhar para o C4</Button>
            <p>"Assinaturas" e legendas</p>
        </CardFooter>
    </Card>
  )
}

export default Papeleta