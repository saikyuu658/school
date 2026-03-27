import { useState } from "react";
import { Button } from "./ui/my-button";
import { Field } from "./ui/my-field";
import { NumericField } from "./ui/my-numericField";

interface StudentGradeCardProps {
  nome: string;
  dataSubmissao: string;
  atrasado?: boolean;
  nota?: string;
  feedback?: string;
  isUpdated?: boolean; // Define se mostra "Save Grade" ou "Updated"
}

export function StudentGradeCard({
  nome,
  dataSubmissao,
  atrasado = false,
  nota = "--",
  isUpdated = false
}: StudentGradeCardProps) {


  const [valueGrade, setValueGrade] = useState('0')
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  
  return (
    <div className="bg-white rounded-md border border-gray-100 shadow-sm p-3 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all hover:shadow-md">
      <div className="flex flex-col gap-1 min-w-62.5">
        <h3 className="text-lg font-bold text-gray-900 leading-tight">
          {nome}
        </h3>
        <div className="flex items-center gap-2">
          {atrasado ? (
            <span className="px-2 py-0.5 bg-orange-100 text-orange-700 text-[10px] font-bold rounded-full uppercase">
              Late
            </span>
          ) : (
            <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">
              On Time
            </span>
          )}
          <span className="text-sm text-gray-400">
            • Submitted {dataSubmissao}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col md:flex-row items-end md:items-center gap-4 w-full">
        <div className="flex flex-col gap-1.5 w-full md:w-32">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Grade (0-10)
          </label>
          {isUpdated ? 
            <NumericField value={valueGrade} onChange={setValueGrade} />:
            <div className="bg-gray-100 rounded-md px-4 py-1 text-center font-semibold text-gray-600 border border-transparent focus-within:border-gray-200">
              {nota}
            </div>

          }
        </div>

        <div className="flex flex-col gap-1.5 flex-1 w-full">
          <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            Optional Feedback
          </label>
           {isUpdated ? 
              <Field
                value={value}
                onChange={handleChange}
              ></Field>:
            <div className="bg-gray-100 rounded-md px-4 py-1 text-center font-semibold text-gray-600 border border-transparent focus-within:border-gray-200">
              {nota}
            </div>

          }
        </div>

        <div className="md:pt-5">
          {isUpdated ? (
            <Button variant="secondary">Salvar</Button>
          ) : (
            <Button variant="tertiary">Atualizar</Button>
          )}
        </div>

      </div>
    </div>
  );
}

export default StudentGradeCard;