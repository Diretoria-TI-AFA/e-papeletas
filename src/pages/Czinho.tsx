import TopMenu from "@/components/TopMenu"
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card"


const Czinho = () => {
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
                Aqui você pode visualizar e gerenciar as papeletas.
            </CardDescription>
            <CardContent>
                
                <div className="grid grid-cols-2 items-center justify-center h-64">
                  PAPELETAS AQUI
                </div>
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
