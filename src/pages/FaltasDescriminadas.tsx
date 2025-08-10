import { TopMenu } from '@/components/TopMenu.tsx';
import { Card } from "@/components/ui/card"


const FaltasDescriminadas = () => {
  return (
    <section className='h-screen w-screen' style={{ backgroundImage: "url('/fundop.png')",backgroundSize: "100% auto",backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
      <header  className="flex justify-center position-absolute top-0 m-0 p-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
        <div>
          <TopMenu></TopMenu>
        </div>
      </header>
      <div className="w-auto mx-2 flex flex-col items-center">
        <div className="w-full my-4 rounded-lg bg-yellow-200/40 backdrop-blur-xs border border-yellow-200/50 shadow-md shadow-yellow-200/30">
          <h1 className="text-black text-2xl font-bold text-center p-4 w-full m-2">Faltas totais</h1>
            <Card className="p-2 mx-2 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>Em forma</h1>
              <h1>Faltas</h1>
            </Card>
            <div className="grid grid-cols-3 gap-2 p-2">
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>A</h1>
                <p></p>
              </Card>
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>B</h1>
              </Card>
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>C</h1>
              </Card>
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>D</h1>
                <p></p>
              </Card>
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>E</h1>
              </Card>
              <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
                <h1>F</h1>
              </Card>
            </div>
          <h1 className="text-black text-2xl font-bold text-center p-4 w-full m-2">Faltas Descriminadas</h1>
            <Card className="p-2 mx-2 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>Faltas totais discriminadas</h1>
              <p></p>
            </Card>
          <div className="grid grid-cols-3 gap-2 p-2">
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>A</h1>
              <p></p>
            </Card>
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>B</h1>
            </Card>
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>C</h1>
            </Card>
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>D</h1>
              <p></p>
            </Card>
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>E</h1>
            </Card>
            <Card className="p-2 mx-0 bg-white/50 border-2 border-yellow-50/80 shadow-sm shadow-yellow-200/30">
              <h1>F</h1>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FaltasDescriminadas;
