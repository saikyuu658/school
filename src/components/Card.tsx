import { MoreVertical, Calendar, Users, ClipboardCheck } from 'lucide-react';

export function CourseCard() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 md:border-t-4 md:border-t-[#104e7a] flex flex-col gap-4 md:gap-6 transition-all">
      
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
          Active
        </span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-xl md:text-[28px] font-semibold text-gray-900 tracking-tight">
          Advanced Architectural Semantics
        </h2>
        <p className="hidden md:block text-gray-600 text-base leading-relaxed max-w-4xl mt-1">
          Exploring the intersection of structural engineering and post-modern design theory in urban environments.
        </p>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-start md:justify-between md:mt-4 gap-3 md:gap-12">
        
        <div className="flex items-center gap-2 md:gap-4 text-gray-600 md:text-gray-900">
          <Calendar className="w-4 h-4 md:w-6 md:h-6 md:text-[#104e7a]" strokeWidth={1.5} />
          <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0.5">
            <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              Data 
            </span>
            <span className="text-sm md:text-base font-medium">
              Oct 24, 2023
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 text-gray-600 md:text-gray-900">
          <Users className="w-4 h-4 md:w-6 md:h-6 md:text-[#104e7a]" strokeWidth={1.5} />
          <div className="flex flex-row md:flex-col items-center md:items-start gap-2 md:gap-0.5">
            <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              Turma
            </span>
            <span className="text-sm md:text-base font-medium">
              Studio A-12
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-gray-900 md:ml-auto">
          <ClipboardCheck className="w-6 h-6 text-[#104e7a]" strokeWidth={1.5} />
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">
              Envios
            </span>
            <span className="text-base font-medium">
              24 / 30
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseCard;