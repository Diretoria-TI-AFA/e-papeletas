import Login from "@/components/Login"
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center" style={{ backgroundImage: "url('/fundo.png')",backgroundSize: "cover",backgroundPosition: "center", }}>
      <Login />
      <Toaster />
    </div>
  )
}

export default App
