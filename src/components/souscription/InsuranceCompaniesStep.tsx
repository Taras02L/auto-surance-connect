
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface InsuranceCompaniesStepProps {
  companies: string[];
  selectedCompanies: string[];
  onCompanyChange: (company: string, checked: boolean) => void;
}

export const InsuranceCompaniesStep = ({ 
  companies, 
  selectedCompanies, 
  onCompanyChange 
}: InsuranceCompaniesStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Compagnies d'assurance (maximum 3)
      </h3>
      <p className="text-sm text-gray-600 mb-4">
        Sélectionnez jusqu'à 3 compagnies d'assurance
      </p>
      <div className="space-y-4">
        {companies.map((company) => (
          <div key={company} className="flex items-center space-x-3">
            <Checkbox
              id={company}
              checked={selectedCompanies.includes(company)}
              onCheckedChange={(checked) => 
                onCompanyChange(company, checked as boolean)
              }
              disabled={!selectedCompanies.includes(company) && selectedCompanies.length >= 3}
              className="border-blue-300"
            />
            <Label htmlFor={company}>{company}</Label>
          </div>
        ))}
      </div>
    </div>
  );
};
