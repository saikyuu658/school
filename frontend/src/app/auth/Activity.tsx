import { Calendar, Send, Users } from "lucide-react";
import {StudentGradeCard} from "../../components/studentGradCard";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useAnswers } from "../../hooks/useAnswers";
import type { ActivityType } from "../../@types/activties";
import { formatData } from "../utils/formatData";


export function DetailsActivity() {

    const navigate = useNavigate()
    const { allAnswersByActivity, editAnswer } = useAnswers()
    const [data, setData] = useState<any[]>([])
    const location = useLocation();
    const atividade = location.state?.atividade as ActivityType;

    useMemo(() => {
        if (!atividade) {
            toast.error('Atividade não encontrada')
            navigate('/auth/my-activities')
            return
        }

        fetchData()
    }, [atividade])

    
    async function fetchData() {
        try {
            const resp = await allAnswersByActivity(Number(atividade.id))
            setData(resp)
            console.log(resp)
        } catch (error) {
            toast.error('Erro ao buscar atividade')
        }
    }


    async function handleSave(valueGrade: string, valueFeedback: string, id: number) {
        try {
        const newnota = Number(valueGrade)
        if( newnota > 10 || newnota < 0 || isNaN(newnota)) {
            toast.error('A nota deve ser entre 0 e 10')
            return
        }
        await editAnswer({feedback: valueFeedback, nota: newnota}, id) 
        toast.success('Correção salva com sucesso!')
        fetchData()
        } catch (error) {
        toast.error('Erro ao salvar correção')
        }
    }

    return (
        <section className="p-8">
            <div className="flex items-center gap-8 mb-8">
                <div className="bg-blue-500 p-5 rounded-lg shadow-md gap-8 mb-3 text-white h-fit  w-fit">
                    <Send size={24} />
                    <h3 className="text-xl font-semibold w-fit whitespace-nowrap">{data.length} Entregues</h3>
                </div>
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
            </div>
            <div className="flex flex-col gap-4 bg-gray-50">
                {
                    data.length > 0 ? data.map((item: any) => (
                        <StudentGradeCard
                            handleSave={handleSave}
                            id={item.id}
                            key={item.id}
                            nome={item.aluno.username}
                            resposta={item.texto}
                            nota={item.nota}
                            feedback={item.feedback}
                        />
                    )) : <p className="text-gray-500">Nenhuma resposta encontrada</p>
                }
            </div>
        </section>

    )
}