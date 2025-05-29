
export const getStatusInfo = (status: string) => {
  const statusInfo = {
    pending: { label: 'En attente', color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
    in_review: { label: 'En cours d\'examen', color: 'bg-blue-50 text-blue-700 border-blue-200' },
    processing: { label: 'En traitement', color: 'bg-purple-50 text-purple-700 border-purple-200' },
    approved: { label: 'Approuvée', color: 'bg-green-50 text-green-700 border-green-200' },
    rejected: { label: 'Rejetée', color: 'bg-red-50 text-red-700 border-red-200' },
  }[status] || { label: 'En attente', color: 'bg-gray-100 text-gray-700 border-gray-200' };
  
  return statusInfo;
};

export const getGuaranteeLabel = (guarantee: string) => {
  const labels: { [key: string]: string } = {
    rc: "Responsabilité Civile",
    protection: "Protection du Conducteur",
    vol_incendie: "Vol et Incendie",
    tierce_complete: "Tierce Complète",
    tierce_collision: "Tierce Collision",
    assistance_reparation: "Assistance à la Réparation",
    recours_anticipe: "Recours Anticipé",
    assistance: "Assistance"
  };
  return labels[guarantee] || guarantee;
};

export const getDurationLabel = (duration: string) => {
  const labels: { [key: string]: string } = {
    "1_mois": "1 mois",
    "3_mois": "3 mois",
    "6_mois": "6 mois",
    "1_an": "1 an"
  };
  return labels[duration] || duration;
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};
