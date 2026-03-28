import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Card";
import { Field } from "../../components/ui/my-field";

export function History () {

    const navigate = useNavigate()
    function detailsActivitie ( ){
        navigate('/teachers/details-activitie')
    }
    return (
        <section className="p-8">

            <div className="flex justify-between items-end mb-8">
                <div>
                    <h2 className="text-3xl font-bold">Histórico de atividades</h2>
                    <p className="text-gray-500">Reveja atividades.</p>
                </div>
                <Field placeholder="Pesquisar atividade" className="max-w-60"/>
            </div>
            <div className="flex flex-wrap gap-8 my-10">
                
            </div>
        </section>
    )
}