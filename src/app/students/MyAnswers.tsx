import { Field } from "../../components/ui/my-field";
import { ActivityResponseCard } from "../../components/ActivityResponseCard";

export function MyAnwers (){
    return (
        <section className="p-8">
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Histórico de atividades</h2>
                    <p className="text-gray-500">Observe suas notas, busque por atividades e acompanhe seu desenpenho</p>
                </div>
                <Field placeholder="Pesquisar atividade" className="max-w-60"/>
            </div>
            <div className="flex flex-col gap-4 bg-gray-50">

                <ActivityResponseCard
                    title="Julianne Devis"
                    sumeted="Oct 12, 09:42 AM"
                    grade={10}
                />
            </div>
        </section>
    )
}