import { useState } from "react";
import { Button } from "./ui/my-button";
import { Field } from "./ui/my-field";
import { NumericField } from "./ui/my-numericField";
import { ChevronDown, ChevronUp } from "lucide-react"; // Sugestão de ícones
interface StudentGradeCardProps {
  id: number;
  nome: string;
  resposta: string; // Nova prop para o texto do aluno
  nota?: string;
  feedback?: string;
  handleSave: (valueGrade: string, valueFeedback: string, id: number) => void; // Função para salvar a correção
}

export function StudentGradeCard({
  id,
  handleSave,
  nome,
  resposta,
  nota = "--",
  feedback = ""
}: StudentGradeCardProps) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Controle do Accordion

  const [valueGrade, setValueGrade] = useState(nota !== "--" ? nota : '0');
  const [valueFeedback, setValueFeedback] = useState(feedback);

 

  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-sm flex flex-col transition-all hover:shadow-md overflow-hidden">
      
      {/* CABEÇALHO (Onde o professor clica para abrir) */}
      <div 
        className="p-3 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer hover:bg-gray-50/50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-3 min-w-62.5">
          {isOpen ? <ChevronUp size={18} className="text-gray-400" /> : <ChevronDown size={18} className="text-gray-400" />}
          <h3 className="text-lg font-bold text-gray-900 leading-tight">
            {nome}
          </h3>
        </div>

        {/* ÁREA DE STATUS (Resumo da nota à direita) */}
        {!isOpen && (
           <div className="text-sm font-medium text-gray-500">
             Nota atual: <p className="text-blue-600 font-bold">{nota?? '--'}</p>
           </div>
        )}
      </div>

      {/* CONTEÚDO DO ACCORDION (Resposta + Inputs) */}
      {isOpen && (
        <div className="px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30">
          
          {/* Box da Resposta do Aluno */}
          <div className="mb-6 p-4 bg-blue-50/50 rounded-lg border border-blue-100">
            <label className="text-[10px] font-bold text-blue-500 uppercase tracking-wider block mb-2">
              Resposta do Aluno
            </label>
            <p className="text-gray-700 whitespace-pre-wrap">{resposta}</p>
          </div>

          <div className="flex flex-col md:flex-row items-end md:items-center gap-4 w-full">
            <div className="flex flex-col gap-1.5 w-full md:w-32">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Grade (0-10)
              </label>
              {isUpdated ? (
                <NumericField 
                  value={valueGrade} 
                  onChange={setValueGrade} />
              ) : (
                <div className="bg-white rounded-md px-4 py-1 text-center font-semibold text-gray-600 border border-gray-200">
                  {nota ?? '--'}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5 flex-1 w-full">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Optional Feedback
              </label>
              {isUpdated ? (
                <Field
                  value={valueFeedback}
                  onChange={(e) => setValueFeedback(e.target.value)}
                  placeholder="Explique a correção..."
                />
              ) : (
                <div className="bg-white rounded-md px-4 py-1 text-left text-gray-600 border border-gray-200 min-h-8.5">
                  {feedback || "Sem feedback"}
                </div>
              )}
            </div>

            <div className="md:pt-5">
              {isUpdated ? (
                <div className="flex gap-2">
                   <Button variant="secondary" onClick={() => handleSave(valueGrade, valueFeedback, id)}>Salvar</Button>
                   <Button variant="tertiary" onClick={() => setIsUpdated(false)}>Cancelar</Button>
                </div>
              ) : (
                <Button 
                  variant="tertiary"
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setIsUpdated(true);
                  }}
                >
                  Corrigir
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}