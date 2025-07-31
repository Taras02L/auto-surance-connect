
export interface ClientRequest {
  id: string;
  request_type: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
  admin_response: string | null;
}

export const insuranceRequests = [
  { value: "suspend", label: "Suspendre la police" },
  { value: "cancel", label: "Annuler la police" },
  { value: "renew", label: "Renouveler la police" },
  { value: "claim", label: "Déclarer un sinistre" }
];

export const additionalServices = [
  { value: "technical_visit", label: "Visite technique" },
  { value: "tvm", label: "TVM" },
  { value: "location", label: "Location de voiture" },
  { value: "technical_visit", label: "Bon de carburant" },
  { value: "washing", label: "Lavage" },
  { value: "vulcanization", label: "Vulcanisation" },
  { value: "mechanics", label: "Mécanique" },
  { value: "electricity", label: "Électricité" },
  { value: "bodywork_painting", label: "Carrosserie-peinture" },
  { value: "geo", label: "Géolocalisation" },
  { value: "permis", label: "Permis de conduire" },
  { value: "other", label: "Autres" }
];
