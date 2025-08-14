import { Card, CardTitle, CardContent } from "@/components/ui/card";

interface Papeleta {
  num_nome: string;
  esquadrilha: string;
}

interface PapeletaCardProps {
  Pap: Papeleta;
  status: string;
}

const PapeletaCard = ({ Pap }: PapeletaCardProps) => {
const Esquadrilha = `${Pap.esquadrilha}`;

  return (
    <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
      <div className="grid grid-cols-2 items-center gap-2">
        <CardTitle className="px-2 text-md w-52">{Esquadrilha}</CardTitle>
        <CardContent>Outras info necessárias</CardContent>
      </div>
    </Card>
  );
};

export default PapeletaCard;