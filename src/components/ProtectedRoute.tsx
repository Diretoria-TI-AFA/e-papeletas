import { useLogin } from "@/../context/LoginContext";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({
  allowedAccess,
  children,
}: {
  allowedAccess: string[];
  children: React.ReactNode;
}) {
  const { usuarioLogado, loading } = useLogin();

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!usuarioLogado) {
    return <Navigate to="/" />;
  }

  if (!allowedAccess.includes(usuarioLogado.acesso)) {
    return <Navigate to="/" />;
  }

  return children;
}
