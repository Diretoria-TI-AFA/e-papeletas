import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../context/LoginContext";
import { Button } from "@/components/ui/button";
import { Card,CardContent,CardDescription,CardFooter,CardHeader,CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import login from "@/../assets/login.json";

const users = login.users as User[];

interface User {
  nome: string;
  user: string;
  senha: string;
  acesso: string;
  esquadrilha: string;
}

const Login = () => {
  const [user, setUser] = useState<string>("");
  const [senha, setSenha] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { setUsuarioLogado } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const usuario: User | undefined = users.find(
      (u: User) => u.user === user && u.senha === senha
    );

    if (usuario) {
      setUsuarioLogado(usuario);
      if (usuario.acesso === "comando") {
        navigate("/comando");
      } else if (usuario.acesso === "chefe_de_turma") {
        navigate("/chefe");
      } else if (usuario.acesso === "czinho") {
        navigate("/czinho");
      } else if (usuario.acesso === "czao") {
        navigate("/czao");
      }
    } else {

      setError("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen"> {/* Container para centralizar o card */}
      <Card className="w-full max-w-sm shadow-xl backdrop-blur-xs backdrop-brightness-115 bg-yellow-200/20 border border-yellow-300/40">
        <CardHeader>
          <CardTitle className="flex justify-center text-2xl text-black">e-Papeletas</CardTitle>
          <CardDescription className="text-black font-semibold text-center">
            "Ad Augusta Per Angusta" - "To the Heights Through Difficulties"
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Adicionei o onSubmit ao formulário */}
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="Nome" className="font-bold">Nome</Label>
                <Input
                  className="font-semibold"
                  id="Nome"
                  type="text"
                  placeholder="Nome de usuário"
                  value={user} // Liga o valor do input ao estado 'user'
                  onChange={(e) => setUser(e.target.value)} // Atualiza o estado 'user'
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="font-bold">Senha</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  className="font-semibold"
                  value={senha} // Liga o valor do input ao estado 'senha'
                  onChange={(e) => setSenha(e.target.value)} // Atualiza o estado 'senha'
                  required
                />
              </div>
            </div>
            {/* Exibe a mensagem de erro se houver */}
            {error && <p className="text-red-600 text-sm text-center mt-4">{error}</p>}
            
            {/* O botão de submit deve estar dentro do formulário para disparar o onSubmit */}
            <Button
              type="submit"
              className="w-full bg-amber-200/40 border border-amber-200/60 hover:bg-amber-200/60 text-black font-semibold mt-6"
            >
              Entrar
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          {/* O link "Esqueceu a senha?" pode ficar aqui ou dentro do CardContent */}
          {/* Removi o <a> em volta do Button, pois o Button já tem type="submit" */}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;