import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { SubscriptionDetailModal } from "./SubscriptionDetailModal";
import { FileText, Eye, CheckCircle, Clock, AlertCircle, XCircle, Settings } from "lucide-react";

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
  user_id: string;
}

export const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchSubscriptions = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        setSubscriptions(data || []);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les souscriptions",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [user]);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'in_review', label: 'En cours d\'examen', icon: Settings, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'processing', label: 'En traitement', icon: Settings, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'approved', label: 'Approuvée', icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'rejected', label: 'Rejetée', icon: XCircle, color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  const getStatusInfo = (status: string) => {
    const statusInfo = statusOptions.find(option => option.value === status) || statusOptions[1];
    const Icon = statusInfo.icon;
    return { ...statusInfo, Icon };
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredSubscriptions = statusFilter === 'all' 
    ? subscriptions 
    : subscriptions.filter(sub => sub.status === statusFilter);

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
        <div>
          <h2 className="text-2xl font-semibold text-blue-900">
            Gestion des Souscriptions
          </h2>
          <p className="text-gray-600">
            {filteredSubscriptions.length} souscription(s) 
            {statusFilter !== 'all' && ` avec le statut "${statusOptions.find(opt => opt.value === statusFilter)?.label}"`}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filtrer par statut" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {filteredSubscriptions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune souscription trouvée
            </h3>
            <p className="text-gray-600">
              {statusFilter === 'all' 
                ? "Il n'y a pas encore de souscriptions dans le système."
                : `Il n'y a pas de souscriptions avec le statut sélectionné.`
              }
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredSubscriptions.map((subscription) => {
            const statusInfo = getStatusInfo(subscription.status);
            
            return (
              <Card key={subscription.id} className="border-blue-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg text-blue-900">
                        {subscription.first_name} {subscription.last_name}
                      </CardTitle>
                      <CardDescription>
                        Souscription #{subscription.id.slice(0, 8)} • {formatDate(subscription.created_at)}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={statusInfo.color}>
                        <statusInfo.Icon className="h-3 w-3 mr-1" />
                        {statusInfo.label}
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedSubscription(subscription)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Détails
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-blue-900">Contact</p>
                      <p className="text-gray-600">{subscription.phone}</p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Véhicule</p>
                      <p className="text-gray-600">
                        {subscription.energy} • {subscription.seats} places • {subscription.horsepower}ch
                      </p>
                    </div>
                    <div>
                      <p className="font-medium text-blue-900">Garanties</p>
                      <p className="text-gray-600">
                        {subscription.guarantees.length} garantie(s) sélectionnée(s)
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {selectedSubscription && (
        <SubscriptionDetailModal
          subscription={selectedSubscription}
          isOpen={!!selectedSubscription}
          onClose={() => setSelectedSubscription(null)}
          onUpdate={fetchSubscriptions}
        />
      )}
    </div>
  );
};
