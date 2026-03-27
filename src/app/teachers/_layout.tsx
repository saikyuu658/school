import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar";

export function LayoutTeachers (){
    function clearSession(){}
    return (
    <div className="flex h-screen">
      <Navbar
        user={{ name: "Maria Oliveira", role: "Professor" }}
        basePath="/teachers"
        onLogout={clearSession}
      />
      <main className="flex-1 overflow-auto">
       
        <Outlet />
      </main>
    </div>
    )
}