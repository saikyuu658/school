import { useForm } from 'react-hook-form';
import { AlignLeft, Send, Calendar, Users, } from 'lucide-react';
import { TextAreaField } from '../../components/ui/my-textArea';
import { Button } from '../../components/ui/my-button';

interface ActivityFormData {
  answer: string;
}

export function AnswersForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>();

  // Dados da atividade (Mock)
  const activityData = {
    title: "Advanced Architectural Semantics",
    description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
    date: "Oct 24, 2023",
    classNameValue: "Studio A-12",
    status: "Active",
  };

  const onSubmit = (data: ActivityFormData) => {
    console.log("Resposta enviada:", data.answer);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden, mt-[2%]">
      {/* 1. Header com Informações da Atividade */}
      <div className="p-8 border-b border-gray-100 bg-slate-50/50">
        <div className="flex justify-between items-start mb-4">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {activityData.status}
          </span>
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Calendar size={14} />
            <span>Entrega: {activityData.date}</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {activityData.title}
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          {activityData.description}
        </p>

        <div className="flex items-center gap-4 mt-6 text-slate-500 text-xs font-medium uppercase tracking-widest">
           <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#104e7a]" />
              <span>Turma: {activityData.classNameValue}</span>
           </div>
        </div>
      </div>

      {/* 2. Formulário de Resposta */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">
        <TextAreaField
          label="Sua Resposta"
          placeholder="Escreva aqui a sua resolução para esta atividade..."
          icon={<AlignLeft size={18} />}
          error={errors.answer?.message}
          className="min-h-50"
          {...register("answer", { 
            required: "Você não pode enviar uma resposta vazia",
            minLength: { value: 3, message: "Sua resposta deve ser mais detalhada" }
          })}
        />

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button 
            variant="outlined" 
            type="button" 
            disabled={isSubmitting}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Voltar
          </Button>
          
          <Button 
            type="submit" 
            loading={isSubmitting}
            className="bg-[#104e7a] hover:bg-[#0d3f63] text-white px-8"
            icon={<Send size={18} />}
          >
            Enviar Resposta
          </Button>
        </div>
      </form>
    </div>
  );
}