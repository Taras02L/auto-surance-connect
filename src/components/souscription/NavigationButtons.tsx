
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevStep: () => void;
  onNextStep: () => void;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export const NavigationButtons = ({ 
  currentStep, 
  totalSteps, 
  onPrevStep, 
  onNextStep,
  onSubmit,
  isLoading = false
}: NavigationButtonsProps) => {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 && (
        <Button 
          type="button" 
          variant="outline" 
          onClick={onPrevStep}
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
          disabled={isLoading}
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
          disabled={isLoading}
        >
          Suivant
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      ) : (
        <Button 
          type="button"
          onClick={onSubmit}
          className="bg-blue-600 hover:bg-blue-700 ml-auto"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              En cours...
            </>
          ) : (
            "Envoyer la demande"
          )}
        </Button>
      )}
    </div>
  );
};
