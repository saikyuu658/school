import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Card";
import { Field } from "../../components/ui/my-field";

export function HistoricTeacher () {

     const cardsExemple = [
        {
            title: "Advanced Architectural Semantics",
            description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
            date: "Oct 24, 2023",
            classNameValue: "Studio A-12",
            status: "Active",
            },
            {
            title: "Renaissance Proportion",
            description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
            date: "Completed Sep 15",
            classNameValue: "Art History 101",
            status: "Closed",
            },
            {
            title: "Renaissance Proportion",
            description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
            date: "Completed Sep 15",
            classNameValue: "Art History 101",
            status: "Closed",
            },
            {
            title: "Renaissance Proportion",
            description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
            date: "Completed Sep 15",
            classNameValue: "Art History 101",
            status: "Closed",
        },
    ];

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
                {cardsExemple.map((e, index)=>(
                    <CourseCard 
                        key={index}
                        handleclick={detailsActivitie}
                        dataEntrega={e.date}
                        descricao={e.description}
                        titulo={e.title}
                        turma={e.classNameValue}
                        isFull={false}  
                    />
                ))}
            </div>
        </section>
    )
}