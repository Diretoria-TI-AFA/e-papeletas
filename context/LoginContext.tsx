import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  nome: string;
  user: string;
  acesso: string;
  esquadrilha?: string;
  efetivo?: string;
}

interface LoginContextType {
  usuarioLogado: User | null;
  loading: boolean;
  setUsuarioLogado: (user: User | null) => void;
  logout: () => void;
};

const LoginContext = createContext<LoginContextType | undefined>(undefined);

export const LoginProvider = ({ children }: { children: ReactNode }) => {
  const [usuarioLogado, setUsuarioLogadoState] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuarioLogado");
    if (storedUser) {
      setUsuarioLogadoState(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const setUsuarioLogado = (user: User | null) => {
    setUsuarioLogadoState(user);
    if (user) {
      localStorage.setItem("usuarioLogado", JSON.stringify(user));
    } else {
      localStorage.removeItem("usuarioLogado");
    }
  };

  const logout = () => {
    setUsuarioLogado(null);
    localStorage.removeItem("usuario")
  };

  return (
    <LoginContext.Provider value={{ usuarioLogado, loading, setUsuarioLogado, logout }}>
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
