import { NavLink, useNavigate } from "react-router-dom"
import { GraduationCap, LogOut } from "lucide-react"
import type { UserType } from "../@types/user"

interface NavbarProps {
  navItems: { path: string; label: string; icon: React.ElementType }[]
  user: UserType | null
  onLogout?: () => void
}

export default function Navbar({ user, navItems, onLogout }: NavbarProps) {
  const navigate = useNavigate()

  function handleLogout() {
    onLogout?.()
    navigate("/login")
  }

  return (
    <header
      style={{ boxShadow: '0 4px 6px -1px #00000010' }}
      className="w-full h-16 bg-white border-b border-slate-100 flex items-center px-6 sticky top-0 z-50 select-none"
    >
      {/* ── LOGO ────────────────────────────────────── */}
      <div className="flex items-center gap-2.5 mr-8">
        <div className="w-8 h-8 bg-[#0785CB] rounded-lg flex items-center justify-center shrink-0">
          <GraduationCap size={16} className="text-white" />
        </div>
        <span className="text-slate-800 font-bold text-[15px] tracking-tight whitespace-nowrap">
          school
        </span>
      </div>

      {/* ── NAVEGAÇÃO CENTRAL ────────────────────────── */}
      <nav className="flex items-center gap-1 flex-1">
        {navItems.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={`${path}`}
            end
            className={({ isActive }) =>
              [
                "flex items-center gap-2 px-3 h-10 rounded-xl transition-all duration-150",
                isActive
                  ? "bg-[#0785CB] text-white shadow-sm shadow-[#0785CB]/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
              ].join(" ")
            }
          >
            <Icon size={17} className="shrink-0" />
            <span className="text-[13px] font-medium whitespace-nowrap">
              {label}
            </span>
          </NavLink>
        ))}
      </nav>

      {/* ── USUÁRIO E LOGOUT ─────────────────────────── */}
      <div className="flex items-center gap-4 ml-auto pl-4 border-l border-slate-100">
        <div className="text-right hidden sm:block">
          <p className="text-slate-800 text-[13px] font-semibold leading-tight">
            {user?.username} {user?.turma ? `- ${user.turma}` : ""}
          </p>
          <p className="text-slate-400 text-[11px]">{user?.role}</p>
        </div>

        <button
          onClick={handleLogout}
          title="Sair"
          className="flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:bg-red-50 hover:text-red-500 transition-all duration-150 group"
        >
          <LogOut
            size={18}
            className="group-hover:translate-x-0.5 transition-transform duration-150"
          />
        </button>
      </div>
    </header>
  )
}