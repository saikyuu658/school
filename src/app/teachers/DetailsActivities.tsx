import {  Send } from "lucide-react";
import StudentGradeCard from "../../components/studentGradCard";

export function DetailsActivitiesTeacher() {
    return (
        <section className="p-8">
            <div className="bg-blue-500 p-3 rounded-lg shadow-md gap-4 mb-3 text-white  w-fit">
                <Send size={24} />
                <h3 className="text-xl font-semibold w-fit">2 Entregues</h3>
            </div>
            <div className="flex flex-col gap-4 bg-gray-50">

                <StudentGradeCard
                    nome="Julianne Devis"
                    dataSubmissao="Oct 12, 09:42 AM"
                />

                <StudentGradeCard
                    nome="Marcus Thorne"
                    dataSubmissao="Oct 12, 11:15 PM"
                    atrasado={true}
                    nota="7,5"
                    feedback="Great analysis, but watch the..."
                    isUpdated={true}
                />
            </div>
        </section>

    )
}