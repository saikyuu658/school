import { useEffect, useState } from "react";
import { ActivityResponseCard } from "../../components/ActivityResponseCard";
import { useAnswers } from "../../hooks/useAnswers";
import type { AnswerType } from "../../@types/answer";
import toast from "react-hot-toast";

export function MyAnwers (){
    const {myAnwers} = useAnswers()
    const [data, setData] = useState<AnswerType[]>([])
    async function fetchData(){
        try {
            const resp = await myAnwers();
            setData(resp)
        } catch (error) {
            toast.error('Erro ao carregar suas respostas')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <section className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Histórico de Respostas</h2>
                    <p className="text-gray-500">Observe suas notas e acompanhe seu desenpenho</p>
                </div>
            </div>
            <div className="flex flex-col gap-4 bg-gray-50">
                {data.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">Você ainda não enviou nenhuma resposta.</p>
                ) : (
                    data.map((answer) => (
                        <ActivityResponseCard
                            key={answer.id}
                            titulo={answer.atividade_titulo}
                            nota={answer.nota}
                            feedback={answer.feedback?? undefined}
                        />
                    ))
                )}
            </div>
        </section>
    )
}