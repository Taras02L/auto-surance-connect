
interface VerificationStepProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    energy: string;
    seats: string;
    horsepower: string;
    carteGriseImage: File | null;
    guarantees: string[];
    insuranceCompanies: string[];
    contractDurations: string[];
  };
  guaranteeOptions: Array<{ id: string; label: string }>;
  contractDurations: Array<{ value: string; label: string }>;
}

export const VerificationStep = ({ 
  formData, 
  guaranteeOptions, 
  contractDurations 
}: VerificationStepProps) => {
  return (
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
  );
};
