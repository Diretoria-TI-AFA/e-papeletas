import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Login = () => {
  const [identity, setIdentity] = useState<string>(""); // Mudado para 'identity' para clareza
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const { login, usuarioLogado } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(identity, senha);
    } catch (err) {
      console.error("Erro no login:", err);
      setError("Falha ao autenticar. Verifique suas credenciais.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (usuarioLogado) {
      console.log("Usuário logado, redirecionando para a rota de acesso:", usuarioLogado.acesso);
      // CORREÇÃO AQUI: Verificando o valor correto de 'acesso'
      if (usuarioLogado.acesso === "comando") {
        navigate("/comando");
      } else if (usuarioLogado.acesso === "chefe") { 
        navigate("/chefe");
      } else if (usuarioLogado.acesso === "czinho") {
        navigate("/czinho");
      } else if (usuarioLogado.acesso === "czao") {
        navigate("/czao");
      }
    }
  }, [usuarioLogado, navigate]);


  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-sm shadow-xl backdrop-blur-xs backdrop-brightness-115 bg-yellow-200/20 border border-yellow-300/40">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl text-black">e-Papeletas</CardTitle>
          <CardDescription className="text-black font-semibold text-center">
            "Ad Augusta Per Angusta"
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                {/* MUDANÇA AQUI: Label mais clara para o usuário */}
                <Label htmlFor="identity" className="font-bold">Nome</Label>
                <Input
                  className="font-semibold"
                  id="identity"
                  type="text"
                  placeholder="Nome"
                  value={identity}
                  onChange={(e) => setIdentity(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-bold">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  className="font-semibold"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-amber-200/40 border border-amber-200/60 hover:bg-amber-200/60 text-black font-semibold mt-6"
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <p className="text-black text-xs text-center">Protótipo 1.0.0</p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;