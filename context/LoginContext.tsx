import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { pb } from '@/lib/pocketbase';
import type { RecordModel } from "pocketbase";

interface user extends RecordModel {
  nome: string;
  user: string;
  acesso: string;
  esquadrilha?: string;
  efetivo?: string;
}

interface LoginContextType {
  usuarioLogado: user | null;
  loading: boolean;
  login: (identity: string, pass: string) => Promise<void>;
  logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioLogado, setUsuarioLogado] = useState<user | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pb.authStore.isValid) {
      setUsuarioLogado(pb.authStore.model as user);
    }
    setLoading(false);
  }, []);

  const login = async (identity: string, pass: string) => {
    console.log("[LoginContext] Tentando autenticar com:", identity);
    
    const authData = await pb.collection('users').authWithPassword(identity, pass);

    console.log("%c[LoginContext] Sucesso! Dados do usuário:", "color: green;", authData.record);
    setUsuarioLogado(authData.record as user);
  };

  const logout = () => {
    pb.authStore.clear();
    setUsuarioLogado(null);
  };

  return (
    <LoginContext.Provider value={{ usuarioLogado, loading, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = (): LoginContextType => {
  const context = useContext(LoginContext);
  if (!context) {
    throw new Error("useLogin deve ser usado dentro de LoginProvider");
  }
  return context;
};