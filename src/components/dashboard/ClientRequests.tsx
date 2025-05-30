
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { FileText, Car, Settings, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ClientRequest {
  id: string;
  request_type: string;
  category: string;
  description: string;
  status: string;
  created_at: string;
  admin_response: string | null;
}

export const ClientRequests = () => {
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    category: "",
    description: ""
  });
  const { user } = useAuth();

  const insuranceRequests = [
    { value: "suspend", label: "Suspendre la police" },
    { value: "cancel", label: "Annuler la police" },
    { value: "renew", label: "Renouveler la police" },
    { value: "claim", label: "Déclarer un sinistre" }
  ];

  const additionalServices = [
    { value: "technical_visit", label: "Visite technique" },
    { value: "tvm", label: "TVM" },
    { value: "washing", label: "Lavage" },
    { value: "vulcanization", label: "Vulcanisation" },
    { value: "mechanics", label: "Mécanique" },
    { value: "electricity", label: "Électricité" },
    { value: "bodywork_painting", label: "Carrosserie-peinture" },
    { value: "other", label: "Autres" }
  ];

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('client_requests')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos demandes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!user || !formData.requestType || !formData.category || !formData.description.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez remplir tous les champs",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('client_requests')
        .insert({
          user_id: user.id,
          request_type: formData.requestType,
          category: formData.category,
          description: formData.description,
          status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Votre demande a été envoyée avec succès",
      });

      setFormData({ requestType: "", category: "", description: "" });
      setIsDialogOpen(false);
      fetchRequests();
    } catch (error) {
      console.error('Error submitting request:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'envoi de la demande",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getRequestLabel = (type: string, category: string) => {
    const allOptions = [...insuranceRequests, ...additionalServices];
    const option = allOptions.find(opt => opt.value === category);
    return option ? option.label : category;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { label: "En attente", variant: "secondary" as const },
      processing: { label: "En cours", variant: "default" as const },
      completed: { label: "Terminé", variant: "default" as const },
      rejected: { label: "Rejeté", variant: "destructive" as const }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge variant={config.variant}>{config.label}</Badge>;
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
          Mes Demandes
        </h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle Demande
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Nouvelle Demande</DialogTitle>
              <DialogDescription>
                Soumettez une demande relative à votre police d'assurance ou pour des services complémentaires.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="requestType">Type de demande</Label>
                <Select value={formData.requestType} onValueChange={(value) => setFormData(prev => ({ ...prev, requestType: value, category: "" }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="insurance">Police d'assurance</SelectItem>
                    <SelectItem value="service">Service complémentaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {formData.requestType && (
                <div>
                  <Label htmlFor="category">Catégorie</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionnez la catégorie" />
                    </SelectTrigger>
                    <SelectContent>
                      {(formData.requestType === "insurance" ? insuranceRequests : additionalServices).map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Décrivez votre demande en détail..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Annuler
                </Button>
                <Button onClick={handleSubmit} disabled={isSubmitting}>
                  {isSubmitting ? "Envoi..." : "Envoyer"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {requests.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Aucune demande
            </h3>
            <p className="text-gray-600">
              Vous n'avez pas encore envoyé de demande.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {requests.map((request) => (
            <Card key={request.id} className="border-blue-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {request.request_type === 'insurance' ? (
                      <FileText className="h-5 w-5 text-blue-600" />
                    ) : (
                      <Car className="h-5 w-5 text-green-600" />
                    )}
                    <div>
                      <CardTitle className="text-lg text-blue-900">
                        {getRequestLabel(request.request_type, request.category)}
                      </CardTitle>
                      <CardDescription>
                        {new Date(request.created_at).toLocaleDateString('fr-FR')}
                      </CardDescription>
                    </div>
                  </div>
                  {getStatusBadge(request.status)}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Description:</p>
                    <p className="text-sm text-gray-600">{request.description}</p>
                  </div>
                  
                  {request.admin_response && (
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm font-medium text-blue-800 mb-1">Réponse de l'assureur:</p>
                      <p className="text-sm text-blue-700">{request.admin_response}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
