import { forwardRef } from 'react';
import { Field } from './my-field'; // Ajuste o caminho conforme seu projeto

interface NumericFieldProps extends Omit<React.ComponentProps<typeof Field>, 'type' | 'onChange'> {
  value?: string | number;
  onChange?: (value: string) => void;
  allowDecimal?: boolean;
  prefix?: string;
}

export const NumericField = forwardRef<HTMLInputElement, NumericFieldProps>(
  ({ onChange, allowDecimal = true, prefix, ...props }, ref) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let val = e.target.value;

      // Remove tudo que não é número ou vírgula/ponto (se decimal permitido)
      if (allowDecimal) {
        val = val.replace(/[^0-9.,]/g, '');
        // Garante que só exista um separador decimal
        const parts = val.split(/[.,]/);
        if (parts.length > 2) {
          val = parts[0] + (val.includes(',') ? ',' : '.') + parts.slice(1).join('');
        }
      } else {
        val = val.replace(/\D/g, '');
      }

      if (onChange) onChange(val);
    };

    return (
      <Field
        {...props}
        ref={ref}
        type="text" // Usamos text para melhor controle de máscara/input
        inputMode="decimal" // Abre o teclado numérico no mobile
        onChange={handleChange}
        // Se houver um prefixo (como R$), passamos como icon
        icon={prefix ? <span className="text-slate-400 font-medium">{prefix}</span> : props.icon}
      />
    );
  }
);

NumericField.displayName = "NumericField";