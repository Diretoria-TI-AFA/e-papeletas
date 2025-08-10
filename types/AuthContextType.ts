export interface AuthContextType {
  user: string | null;
  login: (User: string) => void;
  logout: () => void;
}
