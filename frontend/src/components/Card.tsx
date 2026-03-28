import {Calendar, Users } from 'lucide-react';
import type { ActivityType } from '../@types/activties';
import { formatData } from '../app/utils/formatData';

// 1. Definição da Interface
interface CourseCardProps {
  data: ActivityType
  isFull?: boolean;
  handleclick: ()=>void
}

export function CourseCard({ 
  data,
  handleclick, 
  isFull = false 
}: CourseCardProps) {

  function formatTurma(turma: string) {
    return `Turma ${turma}`
  }

  
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all flex flex-col gap-4  
     md:p-8 md:border-t-4 md:border-t-[#104e7a] md:gap-6 flex-1 cursor-pointer hover:shadow-xl`}
      onClick={handleclick}
     >
      
      <div className="flex flex-col gap-2">
        <h2 className={`font-semibold text-gray-900 tracking-tight ${isFull ? 'text-xl md:text-[28px]' : 'text-lg'}`}>
          {data.titulo}
        </h2>
        
        {isFull && (
          <p className="hidden md:block text-gray-600 text-base leading-relaxed max-w-4xl mt-1 text-ellipsis overflow-hidden">
            {data.descricao}
          </p>
        )}
      </div>

      <div className={`flex flex-col gap-3 ${isFull ? 'md:flex-row md:items-center justify-start  md:mt-4 md:gap-12' : ''}`}>
        
        <div className={`flex items-center gap-2 ${isFull ? 'md:gap-4 text-gray-600 md:text-gray-900' : 'text-gray-600'}`}>
          <Calendar className={`w-4 h-4 ${isFull ? 'md:w-6 md:h-6 md:text-[#104e7a]' : ''}`} strokeWidth={1.5} />
          <div className={`flex flex-row items-center gap-2 ${isFull ? 'md:flex-col md:items-start md:gap-0.5' : ''}`}>
            {isFull && <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Entrega</span>}
            <span className="text-sm md:text-base font-medium">{formatData(data.data_entrega)}</span>
          </div>
        </div>

        {/* TURMA */}
        <div className={`flex items-center gap-2 ${isFull ? 'md:gap-4 text-gray-600 md:text-gray-900' : 'text-gray-600'}`}>
          <Users className={`w-4 h-4 ${isFull ? 'md:w-6 md:h-6 md:text-[#104e7a]' : ''}`} strokeWidth={1.5} />
          <div className={`flex flex-row items-center gap-2 ${isFull ? 'md:flex-col md:items-start md:gap-0.5' : ''}`}>
            {isFull && <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Turma</span>}
            <span className="text-sm md:text-base font-medium">{formatTurma(data.turma)}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseCard;