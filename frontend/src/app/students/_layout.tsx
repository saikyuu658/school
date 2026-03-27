import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

export function LayoutStudent (){
    function clearSession(){}
    return (
    <div className="flex h-screen">
      <Navbar
        user={{ name: "Maria Oliveira", role: "Aluno" }}
        basePath="/student"
        onLogout={clearSession}
      />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
    )
}