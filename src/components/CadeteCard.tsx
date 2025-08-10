import { Card, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Cadete {
  num_nome: string;
  esquadrilha: string;
}

interface CadeteCardProps {
  cad: Cadete;
  status: string;
  onStatusChange: (status: string) => void;
}

const CadeteCard = ({ cad, status, onStatusChange }: CadeteCardProps) => {
const Num_Nome = `${cad.num_nome}`;

  return (
    <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
      <div className="grid grid-cols-2 items-center gap-2">
        <CardTitle className="px-2 text-md w-52">{Num_Nome}</CardTitle>
        <Select value={status} onValueChange={onStatusChange}>
          <SelectTrigger className="px-2 w-1/2 ml-auto group inline-flex rounded-md bg-amber-300/40 backdrop-blur-xs backdrop-brightness-105 border-2 border-amber-200/60 py-2 text-sm font-medium">
            <SelectValue placeholder='Presente' />
          </SelectTrigger>
          <SelectContent>
                        <SelectItem value="0">Presente</SelectItem>
                        <SelectItem value="1">AGD</SelectItem>
                        <SelectItem value="2">ATL</SelectItem>
                        <SelectItem value="3">BXD</SelectItem>
                        <SelectItem value="4">CON</SelectItem>
                        <SelectItem value="5">DPM</SelectItem>
                        <SelectItem value="6">EME</SelectItem>
                        <SelectItem value="7">EVV</SelectItem>
                        <SelectItem value="8">FIS</SelectItem>
                        <SelectItem value="9">GUI</SelectItem>
                        <SelectItem value="10">LID</SelectItem>
                        <SelectItem value="11">ODO</SelectItem>
                        <SelectItem value="12">OSP</SelectItem>
                        <SelectItem value="13">SVC</SelectItem>
                        <SelectItem value="14">SVS</SelectItem>
                        <SelectItem value="15">VGM</SelectItem>
                        <SelectItem value="16">VOO</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </Card>
  );
};

export default CadeteCard;