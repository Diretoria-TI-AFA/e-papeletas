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
                        <SelectItem value="AGD">AGD</SelectItem>
                        <SelectItem value="ATL">ATL</SelectItem>
                        <SelectItem value="BAIXADO">BXD</SelectItem>
                        <SelectItem value="CON">CON</SelectItem>
                        <SelectItem value="DPM">DPM</SelectItem>
                        <SelectItem value="EME">EME</SelectItem>
                        <SelectItem value="EVV">EVV</SelectItem>
                        <SelectItem value="FIS">FIS</SelectItem>
                        <SelectItem value="GUI">GUI</SelectItem>
                        <SelectItem value="LID">LID</SelectItem>
                        <SelectItem value="ODO">ODO</SelectItem>
                        <SelectItem value="OSP">OSP</SelectItem>
                        <SelectItem value="SVC">SVC</SelectItem>
                        <SelectItem value="SVS">SVS</SelectItem>
                        <SelectItem value="VGM">VGM</SelectItem>
                        <SelectItem value="VOO">VOO</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default CadeteCard;