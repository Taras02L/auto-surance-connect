import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { StepIndicator } from "@/components/souscription/StepIndicator";
import { PersonalInfoStep } from "@/components/souscription/PersonalInfoStep";
import { VehicleInfoStep } from "@/components/souscription/VehicleInfoStep";
import { GuaranteesStep } from "@/components/souscription/GuaranteesStep";
import { InsuranceCompaniesStep } from "@/components/souscription/InsuranceCompaniesStep";
import { ContractDurationStep } from "@/components/souscription/ContractDurationStep";
import { VerificationStep } from "@/components/souscription/VerificationStep";
import { NavigationButtons } from "@/components/souscription/NavigationButtons";
import { useSubscription } from "@/hooks/useSubscription";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const Souscription = () => {
  console.log('Souscription component is rendering');
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    energy: "",
    seats: "",
    horsepower: "",
    carteGriseImage: null as File | null,
    guarantees: ["rc", "protection"] as string[],
    insuranceCompanies: [] as string[],
    contractDurations: [] as string[],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { createSubscription, isLoading } = useSubscription();
  const { user } = useAuth();
  const navigate = useNavigate();

  const steps = [
    { number: 1, title: "Informations personnelles" },
    { number: 2, title: "Véhicule" },
    { number: 3, title: "Garanties" },
    { number: 4, title: "Compagnies d'assurance" },
    { number: 5, title: "Durée du contrat" },
    { number: 6, title: "Vérification" }
  ];

  const guaranteeOptions = [
    { id: "rc", label: "Responsabilité Civile", required: true },
    { id: "protection", label: "Protection du Conducteur", required: true },
    { id: "vol_incendie", label: "Vol et Incendie" },
    { id: "tierce_complete", label: "Tierce Complète" },
    { id: "tierce_collision", label: "Tierce Collision" },
    { id: "assistance_reparation", label: "Assistance à la Réparation" },
    { id: "recours_anticipe", label: "Recours Anticipé" },
    { id: "assistance", label: "Assistance" }
  ];

  const insuranceCompanies = [
    "Sanlam",
    "NSIA", 
    "SUNU",
    "GTA",
    "Fidelia"
  ];

  const contractDurations = [
    { value: "1_mois", label: "1 mois" },
    { value: "3_mois", label: "3 mois" },
    { value: "6_mois", label: "6 mois" },
    { value: "1_an", label: "1 an" }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGuaranteeChange = (guaranteeId: string, checked: boolean) => {
    if (guaranteeOptions.find(g => g.id === guaranteeId)?.required) {
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      guarantees: checked 
        ? [...prev.guarantees, guaranteeId]
        : prev.guarantees.filter(g => g !== guaranteeId)
    }));
  };

  const handleInsuranceCompanyChange = (company: string, checked: boolean) => {
    setFormData(prev => {
      const newCompanies = checked
        ? prev.insuranceCompanies.length < 3 
          ? [...prev.insuranceCompanies, company]
          : prev.insuranceCompanies
        : prev.insuranceCompanies.filter(c => c !== company);
      
      return { ...prev, insuranceCompanies: newCompanies };
    });
  };

  const handleContractDurationChange = (duration: string, checked: boolean) => {
    setFormData(prev => {
      const newDurations = checked
        ? prev.contractDurations.length < 2
          ? [...prev.contractDurations, duration]
          : prev.contractDurations
        : prev.contractDurations.filter(d => d !== duration);
      
      return { ...prev, contractDurations: newDurations };
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, carteGriseImage: file }));
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, carteGriseImage: null }));
    setImagePreview(null);
  };

  const nextStep = () => {
    if (currentStep < 6) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    // Empêcher la soumission automatique du formulaire
    e.preventDefault();
  };

  const handleFinalSubmit = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.phone || !formData.address) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires des informations personnelles",
        variant: "destructive",
      });
      setCurrentStep(1);
      return;
    }

    if (!formData.energy || !formData.seats || !formData.horsepower) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs obligatoires du véhicule",
        variant: "destructive",
      });
      setCurrentStep(2);
      return;
    }

    if (!formData.carteGriseImage) {
      toast({
        title: "Erreur",
        description: "Veuillez télécharger la carte grise",
        variant: "destructive",
      });
      setCurrentStep(2);
      return;
    }

    if (formData.insuranceCompanies.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une compagnie d'assurance",
        variant: "destructive",
      });
      setCurrentStep(4);
      return;
    }

    if (formData.contractDurations.length === 0) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner au moins une durée de contrat",
        variant: "destructive",
      });
      setCurrentStep(5);
      return;
    }

    const success = await createSubscription(formData);
    if (success) {
      // Reset form or redirect user
      setFormData({
        firstName: "",
        lastName: "",
        phone: "",
        address: "",
        energy: "",
        seats: "",
        horsepower: "",
        carteGriseImage: null,
        guarantees: ["rc", "protection"],
        insuranceCompanies: [],
        contractDurations: [],
      });
      setImagePreview(null);
      setCurrentStep(1);
    }
  };

  const renderCurrentStep = () => {
    console.log('Rendering step:', currentStep);
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep 
            formData={formData} 
            onInputChange={handleInputChange} 
          />
        );
      case 2:
        return (
          <VehicleInfoStep 
            formData={formData}
            onInputChange={handleInputChange}
            onImageUpload={handleImageUpload}
            onRemoveImage={removeImage}
            imagePreview={imagePreview}
          />
        );
      case 3:
        return (
          <GuaranteesStep 
            guaranteeOptions={guaranteeOptions}
            selectedGuarantees={formData.guarantees}
            onGuaranteeChange={handleGuaranteeChange}
          />
        );
      case 4:
        return (
          <InsuranceCompaniesStep 
            companies={insuranceCompanies}
            selectedCompanies={formData.insuranceCompanies}
            onCompanyChange={handleInsuranceCompanyChange}
          />
        );
      case 5:
        return (
          <ContractDurationStep 
            durations={contractDurations}
            selectedDurations={formData.contractDurations}
            onDurationChange={handleContractDurationChange}
          />
        );
      case 6:
        return (
          <VerificationStep 
            formData={formData}
            guaranteeOptions={guaranteeOptions}
            contractDurations={contractDurations}
          />
        );
      default:
        return null;
    }
  };

  console.log('About to render Souscription UI');

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-300" />
              <h1 className="text-2xl font-bold">2AL Insurance</h1>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="text-blue-900 border-white hover:bg-blue-100">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <StepIndicator steps={steps} currentStep={currentStep} />

          <Card className="border-blue-200">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-900">
                Souscription Assurance Auto
              </CardTitle>
              <CardDescription>
                Étape {currentStep} sur {steps.length}: {steps[currentStep - 1].title}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFormSubmit}>
                {renderCurrentStep()}
                <NavigationButtons 
                  currentStep={currentStep}
                  totalSteps={steps.length}
                  onPrevStep={prevStep}
                  onNextStep={nextStep}
                  onSubmit={handleFinalSubmit}
                  isLoading={isLoading}
                />
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Souscription;
