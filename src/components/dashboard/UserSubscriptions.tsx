
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Calendar, Shield, Car, CheckCircle, Clock, AlertCircle, XCircle, Settings } from "lucide-react";
import { Link } from "react-router-dom";

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

export const UserSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubscriptions(data || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger vos souscriptions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const getStatusInfo = (status: string) => {
    const statusInfo = {
      pending: { label: 'En attente', icon: Clock, color: 'bg-yellow-50 text-yellow-700 border-yellow-200' },
      in_review: { label: 'En cours d\'examen', icon: Settings, color: 'bg-blue-50 text-blue-700 border-blue-200' },
      processing: { label: 'En traitement', icon: Settings, color: 'bg-purple-50 text-purple-700 border-purple-200' },
      approved: { label: 'Approuvée', icon: CheckCircle, color: 'bg-green-50 text-green-700 border-green-200' },
      rejected: { label: 'Rejetée', icon: XCircle, color: 'bg-red-50 text-red-700 border-red-200' },
    }[status] || { label: 'En attente', icon: Clock, color: 'bg-gray-100 text-gray-700 border-gray-200' };
    
    const Icon = statusInfo.icon;
    return { ...statusInfo, Icon };
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

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-blue-900">
          Mes Souscriptions
        </h2>
        <Button asChild>
          <Link to="/souscription">
            <FileText className="h-4 w-4 mr-2" />
            Nouvelle Souscription
          </Link>
        </Button>
      </div>

      {subscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune souscription
            </h3>
            <p className="text-gray-600 mb-4">
              Vous n'avez pas encore de souscription d'assurance.
            </p>
            <Button asChild>
              <Link to="/souscription">
                Créer ma première souscription
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6">
          {subscriptions.map((subscription) => {
            const statusInfo = getStatusInfo(subscription.status);
            
            return (
              <Card key={subscription.id} className="border-blue-200">
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
                    <Badge variant="outline" className={statusInfo.color}>
                      <statusInfo.Icon className="h-3 w-3 mr-1" />
                      {statusInfo.label}
                    </Badge>
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
          })}
        </div>
      )}
    </div>
  );
};
