import { MoreVertical, Calendar, Users } from 'lucide-react';

// 1. Definição da Interface
interface CourseCardProps {
  titulo: string;
  descricao: string;
  turma: string;
  dataEntrega: string;
  isFull?: boolean;
}

export function CourseCard({ 
  titulo, 
  descricao, 
  turma, 
  dataEntrega, 
  isFull = false 
}: CourseCardProps) {
  
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all flex flex-col gap-4  
     'md:p-8 md:border-t-4 md:border-t-[#104e7a] md:gap-6' flex-1 `}>
      
      <div className="flex justify-between items-center">
        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">
          Ativo
        </span>
        <button className="text-gray-400 hover:text-gray-600 transition-colors">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col gap-2">
        {/* TÍTULO DINÂMICO */}
        <h2 className={`font-semibold text-gray-900 tracking-tight ${isFull ? 'text-xl md:text-[28px]' : 'text-lg'}`}>
          {titulo}
        </h2>
        
        {/* DESCRIÇÃO DINÂMICA (Só aparece se isFull for true) */}
        {isFull && (
          <p className="hidden md:block text-gray-600 text-base leading-relaxed max-w-4xl mt-1">
            {descricao}
          </p>
        )}
      </div>

      <div className={`flex flex-col gap-3 ${isFull ? 'md:flex-row md:items-center justify-start  md:mt-4 md:gap-12' : ''}`}>
        
        {/* DATA DE ENTREGA */}
        <div className={`flex items-center gap-2 ${isFull ? 'md:gap-4 text-gray-600 md:text-gray-900' : 'text-gray-600'}`}>
          <Calendar className={`w-4 h-4 ${isFull ? 'md:w-6 md:h-6 md:text-[#104e7a]' : ''}`} strokeWidth={1.5} />
          <div className={`flex flex-row items-center gap-2 ${isFull ? 'md:flex-col md:items-start md:gap-0.5' : ''}`}>
            {isFull && <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Entrega</span>}
            <span className="text-sm md:text-base font-medium">{dataEntrega}</span>
          </div>
        </div>

        {/* TURMA */}
        <div className={`flex items-center gap-2 ${isFull ? 'md:gap-4 text-gray-600 md:text-gray-900' : 'text-gray-600'}`}>
          <Users className={`w-4 h-4 ${isFull ? 'md:w-6 md:h-6 md:text-[#104e7a]' : ''}`} strokeWidth={1.5} />
          <div className={`flex flex-row items-center gap-2 ${isFull ? 'md:flex-col md:items-start md:gap-0.5' : ''}`}>
            {isFull && <span className="hidden md:block text-[11px] font-bold text-gray-500 uppercase tracking-widest">Turma</span>}
            <span className="text-sm md:text-base font-medium">{turma}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

export default CourseCard;