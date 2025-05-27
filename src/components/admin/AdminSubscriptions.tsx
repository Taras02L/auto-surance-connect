
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { FileText, Search, Calendar, Car, User } from "lucide-react";

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
}

export const AdminSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredSubscriptions = subscriptions.filter(sub => 
    sub.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sub.phone.includes(searchTerm)
  );

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
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une souscription..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
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
          filteredSubscriptions.map((subscription) => (
            <Card key={subscription.id} className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {subscription.first_name} {subscription.last_name}
                </CardTitle>
                <CardDescription>
                  Souscription créée le {new Date(subscription.created_at).toLocaleDateString('fr-FR')}
                </CardDescription>
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
                    <div>
                      <span className="font-medium text-sm">Garanties:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {subscription.guarantees.map((guarantee, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {guarantee}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <span className="font-medium text-sm">Compagnies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {subscription.insurance_companies.map((company, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {company}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        Voir détails
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
