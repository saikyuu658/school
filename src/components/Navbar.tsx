

import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import {
  GraduationCap,
  LayoutDashboard,
  ClipboardList,
  History,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"


export interface NavbarUser {
  name: string
  role: "Direção" | "Professor" | "Aluno"
  avatarUrl?: string
}

interface NavbarProps {
  user: NavbarUser
  basePath: string   // ex: "/professor" | "/aluno"
  onLogout?: () => void
}


const navItems: { path: string; label: string; icon: React.ElementType }[] = [
  { path: "dashboard",  label: "Dashboard",  icon: LayoutDashboard },
  { path: "activities", label: "Atividades",  icon: ClipboardList   },
  { path: "historic",  label: "Histórico",   icon: History         },
]


function Avatar({ user }: { user: NavbarUser }) {
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name}
        className="w-9 h-9 rounded-xl object-cover flex-shrink-0"
      />
    )
  }

  return (
    <div className="w-9 h-9 rounded-xl bg-[#0785CB]/10 text-[#0785CB] text-[12px] font-bold flex items-center justify-center flex-shrink-0">
      {initials}
    </div>
  )
}


export default function Navbar({ user, basePath, onLogout }: NavbarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    onLogout?.()
    navigate("/login")
  }

  return (
    <aside
      className={[
        "relative flex flex-col h-screen bg-white border-r border-slate-100",
        "transition-all duration-300 ease-in-out select-none flex-shrink-0",
        collapsed ? "w-[68px]" : "w-[220px]",
      ].join(" ")}
    >
      <div
        className={[
          "flex items-center gap-2.5 px-4 py-[18px] border-b border-slate-100 overflow-hidden",
          collapsed ? "justify-center px-0" : "",
        ].join(" ")}
      >
        <div className="w-8 h-8 bg-[#0785CB] rounded-lg flex items-center justify-center flex-shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <span
          className={[
            "text-slate-800 font-bold text-[15px] tracking-tight whitespace-nowrap",
            "transition-all duration-300 overflow-hidden",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
          ].join(" ")}
        >
          school
        </span>
      </div>

      <button
        onClick={() => setCollapsed((v) => !v)}
        aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
        className="absolute -right-2.75 top-12.5 w-5.5 h-5.5 rounded-full
          bg-white border border-slate-200 shadow-sm z-10
          flex items-center justify-center
          text-slate-400 hover:text-slate-600 hover:bg-slate-50
          transition-colors duration-150"
      >
        {collapsed
          ? <ChevronRight size={11} strokeWidth={2.5} />
          : <ChevronLeft  size={11} strokeWidth={2.5} />
        }
      </button>

      <div
        className={[
          "flex items-center gap-2.5 mx-2.5 mt-4 mb-1.5 p-2.5",
          "rounded-xl bg-slate-50 border border-slate-100 overflow-hidden",
          collapsed ? "justify-center" : "",
        ].join(" ")}
      >
        <Avatar user={user} />
        <div
          className={[
            "min-w-0 transition-all duration-300 overflow-hidden",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
          ].join(" ")}
        >
          <p className="text-slate-800 text-[13px] font-semibold truncate leading-tight">
            {user.name}
          </p>
          <p className="text-slate-400 text-[11px] mt-0.5">{user.role}</p>
        </div>
      </div>

      <p
        className={[
          "px-4 pt-3 pb-1.5 text-[10px] font-semibold text-slate-300 uppercase tracking-widest",
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          collapsed ? "opacity-0" : "opacity-100",
        ].join(" ")}
      >
        Menu
      </p>

      <nav className="flex flex-col gap-0.5 px-2 flex-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={`${basePath}/${path}`}
            end
            title={collapsed ? label : undefined}
            className={({ isActive }) =>
              [
                "flex items-center gap-2.5 rounded-xl h-10 w-full relative group",
                "transition-all duration-150",
                collapsed ? "justify-center px-0" : "px-3",
                isActive
                  ? "bg-[#0785CB] text-white shadow-sm shadow-[#0785CB]/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
              ].join(" ")
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={17}
                  className={[
                    "flex-shrink-0 transition-transform duration-150 group-hover:scale-110",
                    isActive
                      ? "text-white"
                      : "text-slate-400 group-hover:text-[#0785CB]",
                  ].join(" ")}
                />

                <span
                  className={[
                    "text-[13px] font-medium whitespace-nowrap",
                    "transition-all duration-300 overflow-hidden",
                    collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
                  ].join(" ")}
                >
                  {label}
                </span>

                {/* Indicador ativo */}
                {isActive && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/60 flex-shrink-0" />
                )}

                {/* Tooltip colapsado */}
                {collapsed && (
                  <span
                    className="absolute left-full ml-3 px-2.5 py-1 rounded-lg
                      bg-slate-800 text-white text-[12px] font-medium whitespace-nowrap
                      shadow-lg z-50 pointer-events-none
                      opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                  >
                    {label}
                  </span>
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ── LOGOUT ────────────────────────────────────── */}
      <div className="px-2 pb-4">
        <div className="h-px bg-slate-100 mb-2.5" />
        <button
          onClick={handleLogout}
          className={[
            "flex items-center gap-2.5 rounded-xl h-10 w-full",
            "text-slate-400 hover:bg-red-50 hover:text-red-500",
            "transition-all duration-150 group relative",
            collapsed ? "justify-center px-0" : "px-3",
          ].join(" ")}
        >
          <LogOut
            size={17}
            className="flex-shrink-0 text-slate-300 group-hover:text-red-400 group-hover:-translate-x-0.5 transition-all duration-150"
          />
          <span
            className={[
              "text-[13px] font-medium whitespace-nowrap",
              "transition-all duration-300 overflow-hidden",
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100",
            ].join(" ")}
          >
            Sair
          </span>
          {collapsed && (
            <span
              className="absolute left-full ml-3 px-2.5 py-1 rounded-lg
                bg-slate-800 text-white text-[12px] font-medium whitespace-nowrap
                shadow-lg z-50 pointer-events-none
                opacity-0 group-hover:opacity-100 transition-opacity duration-150"
            >
              Sair
            </span>
          )}
        </button>
      </div>
    </aside>
  )
}

// ─── USAGE ─────────────────────────────────────────────────
//
// // app/professor/_layout.tsx
// import { Outlet } from "react-router-dom"
// import Navbar from "@/components/Navbar"
//
// export default function ProfessorLayout() {
//   return (
//     <div className="flex h-screen bg-slate-50">
//       <Navbar
//         user={{ name: "Maria Oliveira", role: "Professor" }}
//         basePath="/professor"
//         onLogout={() => clearSession()}
//       />
//       <main className="flex-1 overflow-auto">
//         <Outlet />
//       </main>
//     </div>
//   )
// }
//
// // router.tsx
// <Route path="/professor" element={<ProfessorLayout />}>
//   <Route index element={<Navigate to="dashboard" replace />} />
//   <Route path="dashboard"  element={<Dashboard />}  />
//   <Route path="atividades" element={<Atividades />}  />
//   <Route path="historico"  element={<Historico />}   />
// </Route>
