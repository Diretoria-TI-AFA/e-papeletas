import { Card, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface cadete {
  num_nome: string;
  esquadrilha: string;
}

interface CadeteCardProps {
  cad: cadete;
  status: string;
  onStatusChange: (status: string) => void;
}

const CadeteCard = ({ cad, status, onStatusChange }: CadeteCardProps) => {
const num_nome = `${cad.num_nome}`;

  return (
    <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
      <div className="grid grid-cols-2 items-center gap-2">
        <CardTitle className="px-2 text-md w-52">{num_nome}</CardTitle>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="px-2 w-1/2 ml-auto group inline-flex rounded-md bg-amber-300/40 backdrop-blur-xs backdrop-brightness-105 border-2 border-amber-200/60 py-2 text-sm font-medium">
            <SelectValue placeholder='Presente' />
          </SelectTrigger>
          <SelectContent>
                        <SelectItem value="0">Presente</SelectItem>
                        <SelectItem value="Aguarda desligamento">AGD</SelectItem>
                        <SelectItem value="Atleta">ATL</SelectItem>
                        <SelectItem value="Baixado">BXD</SelectItem>
                        <SelectItem value="Consulta Médica">CON</SelectItem>
                        <SelectItem value="Dispensa Médica">DPM</SelectItem>
                        <SelectItem value="Emergência">EME</SelectItem>
                        <SelectItem value="Esquadrão de voo a vela">EVV</SelectItem>
                        <SelectItem value="Fisioterapia">FIS</SelectItem>
                        <SelectItem value="Guia">GUI</SelectItem>
                        <SelectItem value="Liderança">LID</SelectItem>
                        <SelectItem value="Odontologia">ODO</SelectItem>
                        <SelectItem value="Ordem Superior">OSP</SelectItem>
                        <SelectItem value="Serviço">SVC</SelectItem>
                        <SelectItem value="Serviço SCAER">SVS</SelectItem>
                        <SelectItem value="Viagem">VGM</SelectItem>
                        <SelectItem value="Instrução de Voo">VOO</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default CadeteCard;