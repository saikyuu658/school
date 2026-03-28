import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { useAuth } from "../../hooks/useAuth";
import { useMemo } from "react";
import { ClipboardList } from "lucide-react";

export function Layout (){
    const {logout, getMe, user } = useAuth()

    const navItems: { path: string; label: string; icon: React.ElementType }[] = useMemo(() => {
        if(user?.role === 'ALUNO'){
            return [
              { path: "my-activities", label: "Minhas Atividades",  icon: ClipboardList },
              { path: "my-answers", label: "Minhas Respostas",  icon: ClipboardList },
            ]
        }else if(user?.role === 'PROFESSOR'){
            return [
              { path: "activities", label: "Atividades",  icon: ClipboardList },
            ]
        }
        return []
    }, [user?.role])

    useMemo(() => {
      if(!user){
        getMe()
      }
    }, [])
    return (
    <div className="flex h-screen">
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