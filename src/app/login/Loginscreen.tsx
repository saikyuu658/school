

import { useState } from "react"
import {
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  Users,
  ArrowRight,
} from "lucide-react"
import { Field } from "../../components/ui/my-field"
import { Button } from "../../components/ui/my-button"
import { useNavigate } from "react-router-dom"


interface FormState {
  email: string
  password: string
}

interface FormErrors {
  email?: string
  password?: string
}


const features = [
  { icon: BookOpen, label: "Gestão de Atividades" },
  { icon: Users, label: "Alunos e professores" },
]


function validate(form: FormState): FormErrors {
  const errors: FormErrors = {}
  if (!form.email) {
    errors.email = "E-mail é obrigatório."
  } else if (!/\S+@\S+\.\S+/.test(form.email)) {
    errors.email = "Informe um e-mail válido."
  }
  if (!form.password) {
    errors.password = "Senha é obrigatória."
  } else if (form.password.length < 6) {
    errors.password = "A senha deve ter ao menos 6 caracteres."
  }
  return errors
}


export default function LoginScreen() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  function handleChange(field: keyof FormState) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }))
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    navigate('/teachers/dashboard')
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1800))
    setLoading(false)
    setSuccess(true)
  }

  return (
    <div className="min-h-screen flex font-sans bg-[#F8FAFC]">

      <div className="hidden lg:flex flex-col justify-between w-[46%] bg-[#0785CB] relative overflow-hidden px-14 py-12">

        <div className="flex items-center gap-3 relative z-10">
          <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
            <GraduationCap size={22} className="text-white" />
          </div>
        </div>

        <div className="relative z-10 space-y-6">
          <div className="space-y-3">
            <span className="inline-block text-white/60 text-sm font-medium tracking-widest uppercase">
              Sistema de Gestão Escolar
            </span>
            <h1 className="text-white text-[40px] font-bold leading-[1.15] tracking-tight">
              Sistema de atividades<br />escolar para candidatura<br />
              <span className="text-white/70"> de programador pleno.</span>
            </h1>
          </div>

          <p className="text-white/65 text-[15px] leading-relaxed max-w-xs">
            Meu Sistema para candidatura de vaga de programador pleno, pela CED. Espero que gostem
          </p>

          <div className="flex flex-col gap-3 pt-2">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                  <Icon size={15} className="text-white" />
                </div>
                <span className="text-white/80 text-sm font-medium">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-white/40 text-xs">
          © {new Date().getFullYear()} Saikyuu · Todos os direitos reservados
        </p>

        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/5" />
        <div className="absolute top-24 -right-16 w-52 h-52 rounded-full border border-white/8" />
        <div className="absolute top-10 right-10 w-3 h-3 rounded-full bg-white/30" />
        <div className="absolute top-32 right-28 w-1.5 h-1.5 rounded-full bg-white/20" />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-100">

          <div className="flex lg:hidden items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-[#0785CB] rounded-xl flex items-center justify-center">
              <GraduationCap size={18} className="text-white" />
            </div>
            <span className="text-slate-800 text-lg font-bold tracking-tight">EduConnect</span>
          </div>

          {success ? (
            <div className="text-center space-y-4 py-8">
              <div className="w-16 h-16 rounded-2xl bg-[#e8f4fd] flex items-center justify-center mx-auto">
                <GraduationCap size={30} className="text-[#0785CB]" />
              </div>
              <div className="space-y-1">
                <h2 className="text-slate-800 text-2xl font-bold tracking-tight">Acesso realizado!</h2>
                <p className="text-slate-400 text-sm">Redirecionando para o painel...</p>
              </div>
              <div className="w-8 h-1 rounded-full bg-[#0785CB] mx-auto animate-pulse" />
            </div>
          ) : (
            <>
              <div className="mb-8 space-y-1">
                <h2 className="text-slate-800 text-2xl font-bold tracking-tight">Bem-vindo de volta</h2>
                <p className="text-slate-400 text-sm">Entre com suas credenciais para acessar</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                <Field
                  label="E-mail institucional"
                  type="email"
                  placeholder="professor@escola.edu.br"
                  value={form.email}
                  onChange={handleChange("email")}
                  error={errors.email}
                  icon={<Mail size={16} />}
                  autoComplete="email"
                />

                <Field
                  label="Senha"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange("password")}
                  error={errors.password}
                  icon={<Lock size={16} />}
                  autoComplete="current-password"
                />


                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    fullWidth
                    loading={loading}
                    iconRight={!loading ? <ArrowRight size={16} /> : undefined}
                  >
                    {loading ? "Entrando..." : "Entrar na plataforma"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}