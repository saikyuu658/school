import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";

export function Layout (){
    const {logout, getMe, user } = useAuth()
    const navigate = useNavigate()
    const [navItems, setNavItems]=useState<{ path: string; label: string; icon: React.ElementType }[] >([])
    useMemo(() => {
        if(user?.role === 'ALUNO'){

            setNavItems([
              { path: "my-answers", label: "Minhas Respostas",  icon: ClipboardList },
            ])
            navigate("/auth/my-activities")

        }else if(user?.role === 'PROFESSOR'){
            navigate("/auth/activities")
            return []
        }
        return []
    }, [user?.role])

    useMemo(() => {
      if(!user){
        getMe()
      }
    }, [])
    return (
    <div className="h-screen">
      <Navbar
        user={user}
        navItems={navItems}
        onLogout={logout}
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
    )
}