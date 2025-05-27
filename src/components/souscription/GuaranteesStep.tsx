
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface GuaranteeOption {
  id: string;
  label: string;
  required?: boolean;
}

interface GuaranteesStepProps {
  guaranteeOptions: GuaranteeOption[];
  selectedGuarantees: string[];
  onGuaranteeChange: (guaranteeId: string, checked: boolean) => void;
}

export const GuaranteesStep = ({ 
  guaranteeOptions, 
  selectedGuarantees, 
  onGuaranteeChange 
}: GuaranteesStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Sélectionnez vos garanties
      </h3>
      <div className="space-y-4">
        {guaranteeOptions.map((guarantee) => (
          <div key={guarantee.id} className="flex items-center space-x-3">
            <Checkbox
              id={guarantee.id}
              checked={selectedGuarantees.includes(guarantee.id)}
              onCheckedChange={(checked) => 
                onGuaranteeChange(guarantee.id, checked as boolean)
              }
              disabled={guarantee.required}
              className="border-blue-300"
            />
            <Label 
              htmlFor={guarantee.id}
              className={`${guarantee.required ? 'font-medium text-blue-900' : ''}`}
            >
              {guarantee.label}
              {guarantee.required && ' (Obligatoire)'}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};
