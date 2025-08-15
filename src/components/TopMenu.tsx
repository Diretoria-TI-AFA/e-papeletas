import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom"; 
import { useLogin } from "@/../context/LoginContext";

const menuConfig = {
  chefe: [
    { label: "Início", path: "/chefe" },
    { label: "Papeletas", path: "/papeletas" },
  ],
  cmd: [
    { label: "Início", path: "/comando" },
    { label: "Papeletas", path: "/papeletas" },
  ],
  c4: [
    { label: "Início", path: "/czinho" },
    { label: "Papeletas", path: "/papeletas" },
    { label: "Faltas", path: "/faltas" },
  ],
  czao: [
    { label: "Início", path: "/czao" },
    { label: "Faltas", path: "/faltas" },
  ],
};

const chefeUsers = ['alfa', 'bravo', 'charlie', 'delta', 'echo', 'fox'];

export function TopMenu() {
  const { usuarioLogado, logout } = useLogin();
  
  // 2. Usar o hook useNavigate, que agora funcionará corretamente
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/"); // Usando navigate para redirecionar
  };

  const getMenuItems = () => {
    const userRole = usuarioLogado?.user as keyof typeof menuConfig;
    if (!userRole) return [];
    
    if (chefeUsers.includes(userRole)) {
      return menuConfig.chefe;
    }
    return menuConfig[userRole] || [];
  };

  const menuItems = getMenuItems();

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
        {usuarioLogado && (
          <>
            {menuItems.map((item: { label: string; path: string }) => (
              <NavigationMenuItem key={item.path}>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Button
                    onClick={() => navigate(item.path)} 
                    className="font-semibold text-black"
                  >
                    {item.label}
                  </Button>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <button
                className={`${navigationMenuTriggerStyle()} bg-red-500/30 border-2 border-red-300/40 hover:bg-red-400/40 hover:border-red-300/30 text-black font-semibold`}
                onClick={handleLogout}
              >
                Sair
              </button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default TopMenu;