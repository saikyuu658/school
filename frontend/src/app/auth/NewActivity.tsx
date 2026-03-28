import { useForm } from 'react-hook-form';
import { Calendar, Users, Type, AlignLeft } from 'lucide-react';
import { Field } from '../../components/ui/my-field'; // Ajuste o caminho
import { TextAreaField } from '../../components/ui/my-textArea'; // Ajuste o caminho
import { Button } from '../../components/ui/my-button'; // Ajuste o caminho
import { Select } from '../../components/ui/my-select';
import * as yup from 'yup';
import { activitiesService } from '../../services/activities.service';
import toast from 'react-hot-toast';

const activitySchema = yup.object({
  titulo: yup.string().required("O título é obrigatório"),
  descricao: yup.string().required("A descrição é obrigatória"),
  turma: yup.string().required("Selecione uma turma"),
  data_entrega: yup.date().required("A data é obrigatória"),
}).required()

type ActivityFormData = yup.InferType<typeof activitySchema>

const optionsTurmas = [
  { value: 'A', label: 'Turma A' },
  { value: 'B', label: 'Turma B' },
  { value: 'C', label: 'Turma C' },
]

export function NewActivity() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>();

  const onSubmit = async (data: ActivityFormData) => {
    try {
      console.log("Dados da Atividade:", data);
      await activitiesService.createActivity(data);
      toast.success("Atividade criada com sucesso!"); 
      reset();
    } catch (error) {
      toast.error("Erro ao criar atividade. Tente novamente.");
      console.error("Erro ao criar atividade:", error);
      alert
    }
  };

   

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mt-10">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Criar Nova Atividade</h1>
        <p className="text-slate-500 text-sm">Preencha os detalhes para publicar a atividade para os alunos.</p>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">

        <Field
          label="Título da Atividade"
          placeholder="Ex: Advanced Architectural Semantics"
          icon={<Type size={18} />}
          error={errors.titulo?.message}
          {...register("titulo", { required: "O título é obrigatório" })}
        />

        <TextAreaField
          label="Descrição"
          placeholder="Descreva os objetivos e instruções da atividade..."
          icon={<AlignLeft size={18} />}
          error={errors.descricao?.message}
          className="min-h-30"
          {...register("descricao", { required: "A descrição é obrigatória" })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Turma"
            placeholder="Turma"
            options={optionsTurmas}
            icon={<Users size={18} />}
            error={errors.turma?.message}
            {...register("turma", { required: "Selecione uma turma" })}
          />

          <Field
            label="Data de Entrega"
            type="datetime-local"
            icon={<Calendar size={18} />}
            error={errors.data_entrega?.message}
            {...register("data_entrega", { required: "A data é obrigatória" })}
          />
        </div>

        <div className="flex justify-end gap-3 mt-4 pt-6 border-t border-gray-100">
          <Button variant="outlined" type="button" disabled={isSubmitting}>
            Voltar
          </Button>
          <Button
            type="submit"
            loading={isSubmitting}
            className="bg-[#104e7a] hover:bg-[#0d3f63] text-white px-8"
          >
            Criar Atividade
          </Button>
        </div>
      </form>
    </div>
  );
}