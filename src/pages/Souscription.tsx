
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Souscription = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    
    // Informations véhicule
    plateNumber: "",
    energy: "",
    brand: "",
    model: "",
    year: "",
    chassisNumber: "",
    
    // Garanties
    guarantees: [] as string[],
    
    // Assurance
    insuranceCompany: "",
    contractDuration: "",
    
    // Conducteur
    driverLicense: "",
    driverAge: ""
  });

  const steps = [
    { number: 1, title: "Informations personnelles" },
    { number: 2, title: "Véhicule" },
    { number: 3, title: "Garanties" },
    { number: 4, title: "Finalisation" }
  ];

  const guaranteeOptions = [
    { id: "rc", label: "Responsabilité Civile", required: true },
    { id: "protection", label: "Protection du Conducteur" },
    { id: "vol", label: "Vol" },
    { id: "incendie", label: "Incendie" },
    { id: "bris", label: "Bris de Glace" },
    { id: "tous_risques", label: "Tous Risques" }
  ];

  const insuranceCompanies = [
    "NSIA Assurances",
    "SAHAM Assurance",
    "OGAR Assurances",
    "Allianz Togo",
    "Beneficial Life"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGuaranteeChange = (guaranteeId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      guarantees: checked 
        ? [...prev.guarantees, guaranteeId]
        : prev.guarantees.filter(g => g !== guaranteeId)
    }));
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Submit to database
    console.log("Souscription data:", formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
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
          {/* Progress Steps */}
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
                    <p className={`font-medium ${
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
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Vos informations personnelles
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Prénom *</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom *</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+22870443322"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Adresse *</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Vehicle Information */}
                {currentStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Informations du véhicule
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="plateNumber">Numéro d'immatriculation *</Label>
                        <Input
                          id="plateNumber"
                          value={formData.plateNumber}
                          onChange={(e) => handleInputChange("plateNumber", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="energy">Énergie *</Label>
                        <Select onValueChange={(value) => handleInputChange("energy", value)}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="Sélectionnez" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="essence">Essence</SelectItem>
                            <SelectItem value="diesel">Diesel</SelectItem>
                            <SelectItem value="electrique">Électrique</SelectItem>
                            <SelectItem value="hybride">Hybride</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="brand">Marque *</Label>
                        <Input
                          id="brand"
                          value={formData.brand}
                          onChange={(e) => handleInputChange("brand", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="model">Modèle *</Label>
                        <Input
                          id="model"
                          value={formData.model}
                          onChange={(e) => handleInputChange("model", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="year">Année *</Label>
                        <Input
                          id="year"
                          type="number"
                          value={formData.year}
                          onChange={(e) => handleInputChange("year", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chassisNumber">Numéro de châssis</Label>
                      <Input
                        id="chassisNumber"
                        value={formData.chassisNumber}
                        onChange={(e) => handleInputChange("chassisNumber", e.target.value)}
                        className="border-blue-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {/* Step 3: Guarantees */}
                {currentStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Sélectionnez vos garanties
                    </h3>
                    <div className="space-y-4">
                      {guaranteeOptions.map((guarantee) => (
                        <div key={guarantee.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={guarantee.id}
                            checked={formData.guarantees.includes(guarantee.id)}
                            onCheckedChange={(checked) => 
                              handleGuaranteeChange(guarantee.id, checked as boolean)
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
                )}

                {/* Step 4: Finalization */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Finalisation de votre souscription
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="insuranceCompany">Compagnie d'assurance *</Label>
                        <Select onValueChange={(value) => handleInputChange("insuranceCompany", value)}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="Sélectionnez une compagnie" />
                          </SelectTrigger>
                          <SelectContent>
                            {insuranceCompanies.map((company) => (
                              <SelectItem key={company} value={company}>
                                {company}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contractDuration">Durée du contrat *</Label>
                        <Select onValueChange={(value) => handleInputChange("contractDuration", value)}>
                          <SelectTrigger className="border-blue-200 focus:border-blue-500">
                            <SelectValue placeholder="Sélectionnez la durée" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1_an">1 an</SelectItem>
                            <SelectItem value="6_mois">6 mois</SelectItem>
                            <SelectItem value="3_mois">3 mois</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                  {currentStep > 1 && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={prevStep}
                      className="border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Précédent
                    </Button>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button 
                      type="button" 
                      onClick={nextStep}
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
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Souscription;
