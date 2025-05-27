
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface DurationOption {
  value: string;
  label: string;
}

interface ContractDurationStepProps {
  durations: DurationOption[];
  selectedDurations: string[];
  onDurationChange: (duration: string, checked: boolean) => void;
}

export const ContractDurationStep = ({ 
  durations, 
  selectedDurations, 
  onDurationChange 
}: ContractDurationStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Durée du contrat (maximum 2)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Sélectionnez jusqu'à 2 durées de contrat
      </p>
      <div className="space-y-4">
        {durations.map((duration) => (
          <div key={duration.value} className="flex items-center space-x-3">
            <Checkbox
              id={duration.value}
              checked={selectedDurations.includes(duration.value)}
              onCheckedChange={(checked) => 
                onDurationChange(duration.value, checked as boolean)
              }
              disabled={!selectedDurations.includes(duration.value) && selectedDurations.length >= 2}
              className="border-blue-300"
            />
            <Label htmlFor={duration.value}>{duration.label}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
