
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SubscriptionStatusManager } from "./SubscriptionStatusManager";
import { CheckCircle, Clock, AlertCircle, XCircle, Settings, Car, User, Shield, Calendar, FileText, MapPin } from "lucide-react";

interface Subscription {
  id: string;
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  energy: string;
  seats: number;
  horsepower: number;
  guarantees: string[];
  insurance_companies: string[];
  contract_durations: string[];
  created_at: string;
  status: string;
  admin_comments: string | null;
  carte_grise_url: string | null;
}

interface SubscriptionDetailModalProps {
  subscription: Subscription | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: () => void;
}

export const SubscriptionDetailModal = ({ 
  subscription, 
  isOpen, 
  onClose, 
  onStatusUpdate 
}: SubscriptionDetailModalProps) => {
  if (!subscription) return null;

  const statusOptions = [
    { value: 'pending', label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'in_review', label: 'En cours d\'examen', icon: Settings, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'processing', label: 'En traitement', icon: Settings, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'approved', label: 'Approuvée', icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'rejected', label: 'Rejetée', icon: XCircle, color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  const getStatusDisplay = (statusValue: string) => {
    return statusOptions.find(option => option.value === statusValue) || statusOptions[0];
  };

  const getGuaranteeLabel = (guarantee: string) => {
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

  const getDurationLabel = (duration: string) => {
    const labels: { [key: string]: string } = {
      "1_mois": "1 mois",
      "3_mois": "3 mois",
      "6_mois": "6 mois",
      "1_an": "1 an"
    };
    return labels[duration] || duration;
  };

  const currentStatusDisplay = getStatusDisplay(subscription.status);
  const StatusIcon = currentStatusDisplay.icon;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl text-blue-900">
            <FileText className="h-6 w-6" />
            Souscription #{subscription.id.slice(0, 8)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Statut et informations générales */}
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">
                Créée le {new Date(subscription.created_at).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <Badge className={currentStatusDisplay.color}>
              <StatusIcon className="h-4 w-4 mr-1" />
              {currentStatusDisplay.label}
            </Badge>
          </div>

          {/* Informations personnelles */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <User className="h-5 w-5" />
              Informations personnelles
            </h3>
            <div className="grid md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Nom complet:</span> {subscription.first_name} {subscription.last_name}
              </div>
              <div>
                <span className="font-medium">Téléphone:</span> {subscription.phone}
              </div>
              <div className="md:col-span-2">
                <span className="font-medium">Adresse:</span> {subscription.address}
              </div>
            </div>
          </div>

          {/* Informations véhicule */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Car className="h-5 w-5" />
              Véhicule
            </h3>
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">Énergie:</span> {subscription.energy}
              </div>
              <div>
                <span className="font-medium">Places:</span> {subscription.seats}
              </div>
              <div>
                <span className="font-medium">Puissance:</span> {subscription.horsepower} CV
              </div>
              {subscription.carte_grise_url && (
                <div className="md:col-span-3">
                  <span className="font-medium">Carte grise:</span>
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-2"
                    onClick={() => window.open(subscription.carte_grise_url!, '_blank')}
                  >
                    Voir le document
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Garanties */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Garanties sélectionnées
            </h3>
            <div className="flex flex-wrap gap-2">
              {subscription.guarantees.map((guarantee) => (
                <Badge key={guarantee} variant="secondary">
                  {getGuaranteeLabel(guarantee)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Compagnies d'assurance */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-900">Compagnies d'assurance</h3>
            <div className="flex flex-wrap gap-2">
              {subscription.insurance_companies.map((company) => (
                <Badge key={company} variant="outline">
                  {company}
                </Badge>
              ))}
            </div>
          </div>

          {/* Durées de contrat */}
          <div className="space-y-3">
            <h3 className="font-semibold text-blue-900 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Durées demandées
            </h3>
            <div className="flex flex-wrap gap-2">
              {subscription.contract_durations.map((duration) => (
                <Badge key={duration} variant="outline">
                  {getDurationLabel(duration)}
                </Badge>
              ))}
            </div>
          </div>

          {/* Commentaires admin actuels */}
          {subscription.admin_comments && (
            <div className="space-y-3">
              <h3 className="font-semibold text-blue-900">Commentaires administrateur</h3>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-blue-800">{subscription.admin_comments}</p>
              </div>
            </div>
          )}

          {/* Gestionnaire de statut */}
          <SubscriptionStatusManager
            subscriptionId={subscription.id}
            currentStatus={subscription.status}
            currentComments={subscription.admin_comments}
            onStatusUpdate={() => {
              onStatusUpdate();
              onClose();
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
