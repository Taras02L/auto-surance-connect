
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { SubscriptionDetailModal } from "./SubscriptionDetailModal";
import { FileText, Search, Calendar, Car, User, CheckCircle, Clock, AlertCircle, XCircle, Settings, Eye } from "lucide-react";

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
  user_id: string;
  status: string;
  admin_comments: string | null;
  carte_grise_url: string | null;
}

export const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'Tous les statuts', icon: FileText },
    { value: 'pending', label: 'En attente', icon: Clock, color: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
    { value: 'in_review', label: 'En cours d\'examen', icon: Settings, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { value: 'processing', label: 'En traitement', icon: Settings, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { value: 'approved', label: 'Approuvée', icon: CheckCircle, color: 'bg-green-100 text-green-800 border-green-200' },
    { value: 'rejected', label: 'Rejetée', icon: XCircle, color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  useEffect(() => {
    fetchSubscriptions();
  }, []);

  const fetchSubscriptions = async () => {
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

  const getStatusDisplay = (statusValue: string) => {
    return statusOptions.find(option => option.value === statusValue) || statusOptions[1];
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesSearch = 
      sub.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const getStatusCount = (status: string) => {
    if (status === 'all') return subscriptions.length;
    return subscriptions.filter(sub => sub.status === status).length;
  };

  const handleViewDetails = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsModalOpen(true);
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
          Gestion des Souscriptions
        </h2>
      </div>

      {/* Filtres et recherche */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex items-center space-x-2 flex-1">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une souscription..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <Select value={statusFilter} on
ValueChange={setStatusFilter}>
          <SelectTrigger className="sm:w-[180px] border-blue-200">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => {
              const Icon = option.icon;
              const count = getStatusCount(option.value);
              return (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {count}
                    </Badge>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-6">
        {filteredSubscriptions.length === 0 ? (
          <Card className="border-blue-200">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <FileText className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Aucune souscription trouvée</p>
            </CardContent>
          </Card>
        ) : (
          filteredSubscriptions.map((subscription) => {
            const statusDisplay = getStatusDisplay(subscription.status);
            const StatusIcon = statusDisplay.icon;

            return (
              <Card key={subscription.id} className="border-blue-200">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        {subscription.first_name} {subscription.last_name}
                      </CardTitle>
                      <CardDescription>
                        Souscription créée le {new Date(subscription.created_at).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                    <Badge className={statusDisplay.color || ""}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {statusDisplay.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <User className="h-4 w-4 text-blue-600" />
                        <span>{subscription.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Car className="h-4 w-4 text-blue-600" />
                        <span>{subscription.energy} - {subscription.seats} places - {subscription.horsepower} CV</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">Adresse:</span> {subscription.address}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      {subscription.admin_comments && (
                        <div className="p-2 bg-blue-50 rounded text-sm border border-blue-200">
                          <p className="font-medium text-blue-800">Commentaires admin:</p>
                          <p className="text-blue-700 line-clamp-2">{subscription.admin_comments}</p>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-blue-300 text-blue-700 hover:bg-blue-50 flex items-center gap-1"
                          onClick={() => handleViewDetails(subscription)}
                        >
                          <Eye className="h-4 w-4" />
                          Voir détails
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <SubscriptionDetailModal
        subscription={selectedSubscription}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStatusUpdate={fetchSubscriptions}
      />
    </div>
  );
};
