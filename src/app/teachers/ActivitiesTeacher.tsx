import { Calendar, GraduationCap, Plus, PlusCircle, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/my-button";
import CourseCard from "../../components/Card";
import { useNavigate } from "react-router-dom";



export function ActivitiesTeacher() {
  const cardsExemple = [
    {
      title: "Advanced Architectural Semantics",
      description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
      date: "Oct 24, 2023",
      classNameValue: "Studio A-12",
      status: "Active",
      icon: <Calendar size={16} />,
    },
    {
      title: "Renaissance Proportion",
      description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
      date: "Completed Sep 15",
      classNameValue: "Art History 101",
      status: "Closed",
      icon: <Calendar size={16} />,
    },
     {
      title: "Renaissance Proportion",
      description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
      date: "Completed Sep 15",
      classNameValue: "Art History 101",
      status: "Closed",
      icon: <Calendar size={16} />,
    },
     {
      title: "Renaissance Proportion",
      description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
      date: "Completed Sep 15",
      classNameValue: "Art History 101",
      status: "Closed",
      icon: <Calendar size={16} />,
    },
   
  ];
  const navigate = useNavigate()
  function newActivite(){
      navigate('/teachers/new-activitie')
  }
  
  return (
    <section className="p-8">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-3xl font-bold">Area de trabalho</h2>
        <p className="text-gray-500">Acompanhe e gerencie suas atividades.</p>
        </div>
        <Button
          icon={< PlusCircle/>}
          onClick={newActivite}
        >
          Nova atividade
        </Button>
      </div>

      <div className="flex flex-wrap gap-8">
        <CourseCard 
          dataEntrega={cardsExemple[0].date}
          descricao={cardsExemple[0].description}
          titulo={cardsExemple[0].title}
          turma={cardsExemple[0].classNameValue}
          isFull={true}  
        />

        <div className="bg-blue-500 p-6 rounded-lg shadow-md flex flex-col gap-4 text-white">
          <GraduationCap size={24} />
          <h3 className="text-xl font-semibold">14 Total Activities</h3>
        </div>
      </div>

      <div className="flex flex-wrap gap-8 my-10">
        {cardsExemple.slice(1, cardsExemple.length).map(e=>(
          <CourseCard 
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