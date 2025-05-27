
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
}

export const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevStep, 
  onNextStep 
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevStep}
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Précédent
        </Button>
      )}
      
      {currentStep < totalSteps ? (
        <Button 
          type="button" 
          onClick={onNextStep}
          className="bg-blue-600 hover:bg-blue-700 ml-auto"
        >
          Suivant
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button 
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 ml-auto"
        >
          Finaliser la souscription
        </Button>
      )}
    </div>
  );
};
