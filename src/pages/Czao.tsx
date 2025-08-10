import TopMenu from "@/components/TopMenu"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


const Czao = () => {
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
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="flex w-full justify-center bg-yellow-300/60 backdrop-blur-sm border border-yellow-200/70 mb-4">
                  <TabsTrigger value="1_ano">1º Ano</TabsTrigger>
                  <TabsTrigger value="2_ano">2º Ano</TabsTrigger>
                  <TabsTrigger value="3_ano">3º Ano</TabsTrigger>
                  <TabsTrigger value="4_ano">4º Ano</TabsTrigger>
                </TabsList>
                <TabsContent value="1_ano">Faltas do 1º ANO</TabsContent>
                <TabsContent value="2_ano">Faltas do 2º ANO</TabsContent>
                <TabsContent value="3_ano">Faltas do 3º ANO</TabsContent>
                <TabsContent value="4_ano">Faltas do 4º ANO</TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-center mt-4">
                <p className="text-black">"AD AUGUSTA PER ANGUSTA"</p>
            </CardFooter>
        </Card>
      </div>
    </section>
  )
}

export default Czao
