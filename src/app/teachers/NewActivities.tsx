interface ActivityFormData {
  titulo: string;
  descricao: string;
  turma: string;
  dataEntrega: string;
}

import { useForm } from 'react-hook-form';
import { Calendar, Users, Type, AlignLeft } from 'lucide-react';
import { Field } from '../../components/ui/my-field'; // Ajuste o caminho
import { TextAreaField } from '../../components/ui/my-textArea'; // Ajuste o caminho
import { Button } from '../../components/ui/my-button'; // Ajuste o caminho

export function CreateActivityForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>();

  const onSubmit = (data: ActivityFormData) => {
    console.log("Dados da Atividade:", data);
    // Aqui entraria sua chamada de API
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
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
          <Field
            label="Turma"
            placeholder="Ex: Studio A-12"
            icon={<Users size={18} />}
            error={errors.turma?.message}
            {...register("turma", { required: "Selecione uma turma" })}
          />

          <Field
            label="Data de Entrega"
            type="date"
            icon={<Calendar size={18} />}
            error={errors.dataEntrega?.message}
            {...register("dataEntrega", { required: "A data é obrigatória" })}
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