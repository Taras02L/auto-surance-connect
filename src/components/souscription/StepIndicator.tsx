
interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export const StepIndicator = ({ steps, currentStep }: StepIndicatorProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
              currentStep >= step.number 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-500'
            }`}>
              {step.number}
            </div>
            <div className="ml-3 hidden sm:block">
              <p className={`font-medium text-sm ${
                currentStep >= step.number 
                  ? 'text-blue-600' 
                  : 'text-gray-500'
              }`}>
                {step.title}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-full h-1 mx-4 ${
                currentStep > step.number 
                  ? 'bg-blue-600' 
                  : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
