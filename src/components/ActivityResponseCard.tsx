import { Calendar, CheckCircle2, MessageSquare, Star } from 'lucide-react';

interface ActivityResponseCardProps {
  title: string;
  sumeted: string;
  grade: string | number;
  feedback?: string;
}

export function ActivityResponseCard({
  title,
  sumeted,
  grade,
  feedback
}: ActivityResponseCardProps) {
  return (
    <div className="group bg-white rounded-xl border border-gray-100 p-4 md:p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
      
      {/* 1. Nome da Atividade e Data */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 size={16} className="text-green-500 shrink-0" />
          <h3 className="text-base md:text-lg font-bold text-gray-900 truncate tracking-tight">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 text-xs">
          <Calendar size={14} />
          <span>Entregue em: {sumeted}</span>
        </div>
      </div>

      {/* 2. Minha Nota */}
      <div className="flex flex-col gap-1 px-4 md:border-l md:border-r border-gray-100 min-w-30">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          Minha Nota
        </span>
        <div className="flex items-center gap-1.5">
          <span className="text-lg font-bold text-[#104e7a]">
            {grade}
          </span>
        </div>
      </div>

      {/* 3. Feedback (Ocupa o resto do espaço ou se esconde se não houver) */}
      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
          <MessageSquare size={10} />
          Feedback do Professor
        </span>
        <p className="text-sm text-slate-600  truncate italic">
          {feedback ? `"${feedback}"` : "Sem feedback disponível ainda."}
        </p>
      </div>


    </div>
  );
}