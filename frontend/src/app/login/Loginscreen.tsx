import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import {
  Mail,
  Lock,
  GraduationCap,
  BookOpen,
  Users,
  ArrowRight,
  User,
} from "lucide-react"
import { Field } from "../../components/ui/my-field"
import { Button } from "../../components/ui/my-button"
import { useNavigate } from "react-router-dom"
import Tabs from "../../components/ui/my-tab"
import { Select } from "../../components/ui/my-select"

const signupSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("Obrigatório"),
  password: yup.string().min(6, "Mínimo 6 caracteres").required("Obrigatório"),
  role: yup.string().oneOf(["teacher", "student"], "Selecione um cargo").required("Obrigatório"),
}).required();

type SignupFormData = yup.InferType<typeof signupSchema>;


const features = [
  { icon: BookOpen, label: "Gestão de Atividades" },
  { icon: Users, label: "Alunos e professores" },
]

export default function LoginScreen() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
  })


  async function onSubmit(data: SignupFormData) {
    console.log("Dados validados:", data)
    await new Promise((r) => setTimeout(r, 1800))

  }

  const options :  {
    label: string;
    value: string | number;
}[] = [
  {label: 'Aluno', value: 'student'},
  {label: 'Professor', value: 'teacher'}

]



  const loginTabs = [
    {
      id: 'register',
      label: 'Criar conta',
      content: (
        <>
          <div className="mb-8 space-y-1">
            <h2 className="text-slate-800 text-2xl font-bold tracking-tight">Bem-vindo</h2>
            <p className="text-slate-400 text-sm">Entre com as informações para criar sua conta</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field
              label="E-mail institucional"
              type="email"
              placeholder="professor@escola.edu.br"
              error={errors.email?.message}
              icon={<Mail size={16} />}
              {...register("email")}
            />
            <Field
              label="Senha"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              icon={<Lock size={16} />}
              {...register("password")}
            />
            <Select
              options={options}
              label="Role"
              error={errors.role?.message}
              icon={<User size={16} />}
              {...register("role")}
            />
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconRight={!isSubmitting ? <ArrowRight size={16} /> : undefined}
              >
                {isSubmitting ? "Criando..." : "Criar conta"}
              </Button>
            </div>
          </form>
        </>
      )
    },
    {
      id: 'login',
      label: 'Entrar',
      content: (
        <>
          <div className="mb-8 space-y-1">
            <h2 className="text-slate-800 text-2xl font-bold tracking-tight">Bem-vindo de volta</h2>
            <p className="text-slate-400 text-sm">Entre com suas credenciais para acessar</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
            <Field
              label="E-mail institucional"
              type="email"
              placeholder="professor@escola.edu.br"
              error={errors.email?.message}
              icon={<Mail size={16} />}
              {...register("email")}
            />
            <Field
              label="Senha"
              type="password"
              placeholder="••••••••"
              error={errors.password?.message}
              icon={<Lock size={16} />}
              {...register("password")}
            />
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isSubmitting}
                iconRight={!isSubmitting ? <ArrowRight size={16} /> : undefined}
              >
                {isSubmitting ? "Entrando..." : "Entrar na plataforma"}
              </Button>
            </div>
          </form>
        </>
      )
    }
  ];

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
            Meu Sistema para candidatura de vaga de programador pleno, pela CED. Espero que gostem.
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

        {/* Círculos Decorativos */}
        <div className="absolute -bottom-20 -right-20 w-72 h-72 rounded-full border border-white/10" />
        <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/5" />
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-100">
          <Tabs tabs={loginTabs} />
        </div>
      </div>
    </div>
  )
}



