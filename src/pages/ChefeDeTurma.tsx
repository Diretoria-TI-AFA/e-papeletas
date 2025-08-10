import { TopMenu } from '@/components/TopMenu.tsx';
import Papeleta from '@/components/Papeleta.tsx';

const ChefeDeTurma = () => {
  return (
    <section className='h-screen w-screen' style={{ backgroundImage: "url('/fundop.png')",backgroundSize: "100% auto",backgroundPosition: "top center", backgroundRepeat: "no-repeat" }}>
      <header  className="flex justify-center position-absolute top-0 m-0 p-2 bg-yellow-200/40 backdrop-blur-sm border border-yellow-200/50">
        <div>
          <TopMenu></TopMenu>
        </div>
      </header>
      <div className="w-auto h-auto mx-2 my-5">
        <Papeleta></Papeleta>
      </div>
    </section>
  )
}

export default ChefeDeTurma
