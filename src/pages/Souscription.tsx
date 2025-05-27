
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Shield, ArrowLeft, ArrowRight, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

const Souscription = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Informations personnelles
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    
    // Informations véhicule
    energy: "",
    seats: "",
    horsepower: "",
    carteGriseImage: null as File | null,
    
    // Garanties
    guarantees: ["rc", "protection"] as string[], // RC et Protection conducteur obligatoires
    
    // Assurance
    insuranceCompanies: [] as string[],
    contractDurations: [] as string[],
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

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
      return; // Ne pas permettre de décocher les garanties obligatoires
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
                    <div className="grid md:grid-cols-3 gap-4">
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
                      <div className="space-y-2">
                        <Label htmlFor="seats">Nombre de places *</Label>
                        <Input
                          id="seats"
                          type="number"
                          min="2"
                          max="50"
                          value={formData.seats}
                          onChange={(e) => handleInputChange("seats", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="horsepower">Nombre de chevaux (Puissance) *</Label>
                        <Input
                          id="horsepower"
                          type="number"
                          min="1"
                          value={formData.horsepower}
                          onChange={(e) => handleInputChange("horsepower", e.target.value)}
                          required
                          className="border-blue-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="carteGrise">Carte grise *</Label>
                      <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
                        {!imagePreview ? (
                          <div className="text-center">
                            <Upload className="mx-auto h-12 w-12 text-blue-400" />
                            <div className="mt-2">
                              <label htmlFor="carteGrise" className="cursor-pointer">
                                <span className="text-blue-600 hover:text-blue-500">
                                  Cliquez pour télécharger
                                </span>
                                <input
                                  id="carteGrise"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                  required
                                />
                              </label>
                            </div>
                            <p className="text-sm text-gray-500">PNG, JPG jusqu'à 10MB</p>
                          </div>
                        ) : (
                          <div className="relative">
                            <img
                              src={imagePreview}
                              alt="Carte grise"
                              className="max-w-full h-auto rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={removeImage}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        )}
                      </div>
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

                {/* Step 4: Insurance Companies */}
                {currentStep === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Compagnies d'assurance (maximum 3)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Sélectionnez jusqu'à 3 compagnies d'assurance
                    </p>
                    <div className="space-y-4">
                      {insuranceCompanies.map((company) => (
                        <div key={company} className="flex items-center space-x-3">
                          <Checkbox
                            id={company}
                            checked={formData.insuranceCompanies.includes(company)}
                            onCheckedChange={(checked) => 
                              handleInsuranceCompanyChange(company, checked as boolean)
                            }
                            disabled={!formData.insuranceCompanies.includes(company) && formData.insuranceCompanies.length >= 3}
                            className="border-blue-300"
                          />
                          <Label htmlFor={company}>{company}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 5: Contract Duration */}
                {currentStep === 5 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Durée du contrat (maximum 2)
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Sélectionnez jusqu'à 2 durées de contrat
                    </p>
                    <div className="space-y-4">
                      {contractDurations.map((duration) => (
                        <div key={duration.value} className="flex items-center space-x-3">
                          <Checkbox
                            id={duration.value}
                            checked={formData.contractDurations.includes(duration.value)}
                            onCheckedChange={(checked) => 
                              handleContractDurationChange(duration.value, checked as boolean)
                            }
                            disabled={!formData.contractDurations.includes(duration.value) && formData.contractDurations.length >= 2}
                            className="border-blue-300"
                          />
                          <Label htmlFor={duration.value}>{duration.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Step 6: Verification */}
                {currentStep === 6 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">
                      Vérification des informations
                    </h3>
                    <div className="space-y-4 bg-blue-50 p-4 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-blue-900">Informations personnelles</h4>
                        <p>Nom: {formData.firstName} {formData.lastName}</p>
                        <p>Téléphone: {formData.phone}</p>
                        <p>Adresse: {formData.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Véhicule</h4>
                        <p>Énergie: {formData.energy}</p>
                        <p>Nombre de places: {formData.seats}</p>
                        <p>Puissance: {formData.horsepower} chevaux</p>
                        <p>Carte grise: {formData.carteGriseImage ? 'Téléchargée' : 'Non téléchargée'}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Garanties sélectionnées</h4>
                        <ul className="list-disc list-inside">
                          {formData.guarantees.map(guaranteeId => {
                            const guarantee = guaranteeOptions.find(g => g.id === guaranteeId);
                            return <li key={guaranteeId}>{guarantee?.label}</li>;
                          })}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Compagnies d'assurance</h4>
                        <ul className="list-disc list-inside">
                          {formData.insuranceCompanies.map(company => (
                            <li key={company}>{company}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900">Durées de contrat</h4>
                        <ul className="list-disc list-inside">
                          {formData.contractDurations.map(durationValue => {
                            const duration = contractDurations.find(d => d.value === durationValue);
                            return <li key={durationValue}>{duration?.label}</li>;
                          })}
                        </ul>
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
                  
                  {currentStep < 6 ? (
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
