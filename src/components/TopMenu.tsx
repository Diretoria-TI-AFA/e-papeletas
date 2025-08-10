import Link from "next/link"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

import { useLogin } from "@/../context/LoginContext";
import { useNavigate } from "react-router-dom";

export function TopMenu() {

  const { usuarioLogado, logout } = useLogin();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/"); 
  };

  

  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList>
        {usuarioLogado && (
          <>
            
            {usuarioLogado?.user === 'alfa' && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "bravo" && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "charlie" && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "delta" && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "echo" && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "fox" && (
              <>      
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/chefe"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>       
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "cmd" && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/comando"><h1 className="font-semibold">Início</h1></Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/faltas"><h1 className="font-semibold">Faltas</h1></Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "c4" && (
              <>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/czinho"><h1 className="font-semibold">Início</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/papeletas"><h1 className="font-semibold">Papeletas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                  <Link href="/faltas"><h1 className="font-semibold">Faltas</h1></Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
              </>
            )}
            {usuarioLogado?.user === "czao" && (
              <>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/czao"><h1 className="font-semibold">Início</h1></Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                    <Link href="/faltas"><h1 className="font-semibold">Faltas</h1></Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </>
            )}
            
            <NavigationMenuItem>
              <button
                className={`${navigationMenuTriggerStyle()} bg-red-500/30 border-2 border-red-300/40 hover:bg-red-400/40 hover:border-red-300/30`}
                onClick={handleLogout}
              >
                <h1 className="font-semibold">Sair</h1>
              </button>
            </NavigationMenuItem>
          </>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default TopMenu
