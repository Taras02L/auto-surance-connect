
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Car, Shield, Calendar } from "lucide-react";
import { SubscriptionStatusBadge } from "./SubscriptionStatusBadge";
import { formatDate, getGuaranteeLabel, getDurationLabel } from "./subscription-utils";

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
}

interface SubscriptionCardProps {
  subscription: Subscription;
}

export const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <Card className="border-blue-200">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg text-blue-900">
              Souscription #{subscription.id.slice(0, 8)}
            </CardTitle>
            <CardDescription>
              Créée le {formatDate(subscription.created_at)}
            </CardDescription>
          </div>
          <SubscriptionStatusBadge status={subscription.status} />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {subscription.admin_comments && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm font-medium text-blue-800 mb-1">Note de l'assureur:</p>
            <p className="text-sm text-blue-700">{subscription.admin_comments}</p>
          </div>
        )}
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900 flex items-center gap-2">
              <Car className="h-4 w-4" />
              Véhicule
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Énergie: {subscription.energy}</p>
              <p>Places: {subscription.seats}</p>
              <p>Puissance: {subscription.horsepower} chevaux</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Garanties
            </h4>
            <div className="flex flex-wrap gap-1">
              {subscription.guarantees.map((guarantee) => (
                <Badge key={guarantee} variant="secondary" className="text-xs">
                  {getGuaranteeLabel(guarantee)}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900">
              Compagnies d'assurance
            </h4>
            <div className="flex flex-wrap gap-1">
              {subscription.insurance_companies.map((company) => (
                <Badge key={company} variant="outline" className="text-xs">
                  {company}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-blue-900 flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Durées demandées
            </h4>
            <div className="flex flex-wrap gap-1">
              {subscription.contract_durations.map((duration) => (
                <Badge key={duration} variant="outline" className="text-xs">
                  {getDurationLabel(duration)}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
