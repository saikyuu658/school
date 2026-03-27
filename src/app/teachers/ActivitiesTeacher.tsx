import { Calendar, GraduationCap, Plus, Sparkles } from "lucide-react";
import { Button } from "../../components/ui/my-button";
import CourseCard from "../../components/Card";



const cards  = [
    {
      title: "Advanced Architectural Semantics",
      description: "Exploring the intersection of structural engineering and post-modern design theory in urban environments.",
      date: "Oct 24, 2023",
      classNameValue: "Studio A-12",
      submissions: "24 / 30",
      status: "Active",
      statusColor: "border-green-500",
      icon: <Calendar size={16} />,
    },
    {
      title: "Renaissance Proportion",
      date: "Completed Sep 15",
      classNameValue: "Art History 101",
      status: "Closed",
      statusColor: "border-gray-500",
      icon: <Calendar size={16} />,
    },
    {
      title: "Digital Materiality",
      date: "Due Nov 02",
      classNameValue: "Interactive Media",
      status: "Active",
      statusColor: "border-green-500",
      icon: <Calendar size={16} />,
    },
  ];
export function ActivitiesTeacher () {
    return (
        <section className="p-3">
            <div>
                <h2 className="">Area de trabalho</h2>
                <p>Acompanhe e gerencie suas atividades.</p>
                <div className="actions">
                    <Button 
                        icon={<Plus />}
                    > 
                        Nova atividade 
                    </Button>
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {cards.map((card, index) => (
        <CourseCard key={index} {...card} />
      ))}
      {/* Exemplo de outros tipos de cards */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col gap-4">
        <Sparkles className="text-blue-500" size={24} />
        <h3 className="text-xl font-semibold text-gray-800">Weekly Engagement</h3>
        <p className="text-gray-600 text-sm">Student participation is up 12% across all curated activities this semester.</p>
        {/* Adicione o gráfico aqui */}
      </div>
      <div className="bg-blue-500 p-6 rounded-lg shadow-md flex flex-col gap-4 text-white">
        <GraduationCap size={24} />
        <h3 className="text-xl font-semibold">14 Total Activities</h3>
      </div>
    </div>
        </section>
    )
}