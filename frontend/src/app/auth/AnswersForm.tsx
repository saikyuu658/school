import { useForm } from 'react-hook-form';
import { AlignLeft, Send, Calendar, Users, } from 'lucide-react';
import { TextAreaField } from '../../components/ui/my-textArea';
import { Button } from '../../components/ui/my-button';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import toast from 'react-hot-toast';
import type { ActivityType } from '../../@types/activties';
import { formatData } from '../utils/formatData';
import * as yup from 'yup';
import { useAnswers } from '../../hooks/useAnswers';
import type { AnswerType } from '../../@types/answer';

const activitySchema = yup.object().shape({
  texto: yup.string().min(3).required('Você não pode enviar uma resposta vazia')
});

type ActivityFormData = yup.InferType<typeof activitySchema>

export function AnswersForm() {
  const {
    register,
    handleSubmit,reset,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormData>();
  const navigate = useNavigate()
  const {submitAnswer, allAnswersByActivity, editMyAnswer} = useAnswers()
  const location = useLocation();
  const atividade = location.state?.atividade as ActivityType;
  const [answers, setAnswers] = useState<AnswerType | null>(null)
  const [expired, setExpired] = useState(false)

  useMemo(() => {
    if(!atividade){
      toast.error('Atividade não encontrada')
      navigate('/auth/my-activities')
      return
    }

    if(new Date(atividade.data_entrega) < new Date()){
      setExpired(true)
    }
    fetchData()
  }, [atividade])

  const handleGoBack = () => {
    navigate('/auth/my-activities')
  }
  async function fetchData(){
    try {
      const resp = await allAnswersByActivity(atividade.id!)
      setAnswers(resp[0])
    } catch (error) {
      toast.error('Erro ao carregar respostas')  
    }
  }

  useEffect(() => {
    if(answers){
      reset({ texto: answers.texto })
    }
  }, [answers, reset])

  
  const onSubmit = async (data: ActivityFormData) => {
    try {
      if(!atividade || !atividade.id) {
        toast.error('Atividade inválida. Não foi possível enviar a resposta.')
        return
      }
      if(answers){
        await editMyAnswer({ texto: data.texto }, answers.id!)
        toast.success('Resposta editada com sucesso!')
      } else {
        await submitAnswer({ texto: data.texto, atividade: atividade.id });
        toast.success('Resposta enviada com sucesso!')
      }
      reset()
      navigate('/auth/my-activities')
    } catch (error) {
      toast.error('Erro ao enviar resposta. Tente novamente.')
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden, mt-[2%]">
      {/* 1. Header com Informações da Atividade */}
      <div className="p-8 border-b border-gray-100 bg-slate-50/50">

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {atividade.titulo}
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          {atividade.descricao}
        </p>

        <div className="flex items-center gap-4 mt-6 text-slate-500 text-xs font-medium uppercase tracking-widest">
           <div className="flex items-center gap-1.5">
              <Users size={14} className="text-[#104e7a]" />
              <span>Turma: {atividade.turma}</span>
           </div>
           <div className="flex items-center gap-1.5">
              <Calendar size={14} className="text-[#104e7a]" />
              <span>Entrega: {formatData(atividade.data_entrega)}</span>
           </div>
        </div>
      </div>

      {/* 2. Formulário de Resposta */}
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 flex flex-col gap-6">
        <TextAreaField
          label="Sua Resposta"
          placeholder="Escreva aqui a sua resolução para esta atividade..."
          icon={<AlignLeft size={18} />}
          error={errors.texto?.message}
          disabled={expired}
          className="min-h-50"
          {...register("texto", { 
            required: "Você não pode enviar uma resposta vazia",
            minLength: { value: 3, message: "Sua resposta deve ser mais detalhada" }
          })}
        />

        <div className="flex justify-end gap-3 pt-6 border-t border-gray-100">
          <Button 
            variant="outlined" 
            type="button" 
            disabled={isSubmitting}
            onClick={handleGoBack}
            className="border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            Voltar
          </Button>
          
          <Button 
            type="submit" 
            loading={isSubmitting}
            disabled={isSubmitting || expired}
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