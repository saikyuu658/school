import { useNavigate } from "react-router-dom";
import CourseCard from "../../components/Card";
import { Send } from "lucide-react";

export function MyAtivities() {

    const navigate = useNavigate()
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

    function handleClickCard (){
        navigate('/student/answers')
    }
    return (
        <section className="p-8">

            <div className="bg-blue-500 p-3 rounded-lg shadow-md gap-4 mb-3 text-white  w-fit">
                <Send size={24} />
                <h3 className="text-xl font-semibold w-fit">1 / 4 Atividades</h3>
            </div>


            <div className="mb-4">
                <CourseCard 
                    handleclick={handleClickCard}
                    dataEntrega={cardsExemple[0].date}
                    descricao={cardsExemple[0].description}
                    titulo={cardsExemple[0].title}
                    turma={cardsExemple[0].classNameValue}
                    isFull={true}  
                />
            </div>
               

            <div className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4">
                <CourseCard 
                    handleclick={()=>{}}
                    dataEntrega={cardsExemple[0].date}
                    descricao={cardsExemple[0].description}
                    titulo={cardsExemple[0].title}
                    turma={cardsExemple[0].classNameValue}
                    isFull={false}  
                    />

                     <CourseCard 
                        handleclick={()=>{}}
                        dataEntrega={cardsExemple[0].date}
                        descricao={cardsExemple[0].description}
                        titulo={cardsExemple[0].title}
                        turma={cardsExemple[0].classNameValue}
                        isFull={false}  
                    />
                     <CourseCard 
                        handleclick={()=>{}}
                        dataEntrega={cardsExemple[0].date}
                        descricao={cardsExemple[0].description}
                        titulo={cardsExemple[0].title}
                        turma={cardsExemple[0].classNameValue}
                        isFull={false}  
                    />
            </div>
        </section>
    )
}