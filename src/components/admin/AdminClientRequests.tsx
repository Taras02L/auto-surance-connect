import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { MessageSquare, Search, FileText, Car, Calendar, User } from "lucide-react";
import { ClientRequest } from "../dashboard/request-types";
import { getRequestLabel, getStatusBadge } from "../dashboard/request-utils";

interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
}

interface ClientRequestWithProfile extends ClientRequest {
  profiles: UserProfile | null;
}

export const AdminClientRequests = () => {
  const [requests, setRequests] = useState<ClientRequestWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ClientRequestWithProfile | null>(null);
  const [adminResponse, setAdminResponse] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('client_requests')
        .select(`
          *,
          profiles:user_id (
            first_name,
            last_name,
            phone
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      console.log('Fetched requests:', data);
      // Type assertion to handle the potential mismatch
      setRequests((data as unknown as ClientRequestWithProfile[]) || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast({
        title: "Erreur",
        description: "Impossible de charger les demandes",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async () => {
    if (!selectedRequest || !newStatus) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner un statut",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);

    try {
      const { error } = await supabase
        .from('client_requests')
        .update({
          status: newStatus,
          admin_response: adminResponse.trim() || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', selectedRequest.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La demande a été mise à jour",
      });

      setSelectedRequest(null);
      setAdminResponse("");
      setNewStatus("");
      fetchRequests();
    } catch (error) {
      console.error('Error updating request:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la mise à jour",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredRequests = requests.filter(request => {
    const profile = request.profiles;
    const fullName = profile ? `${profile.first_name} ${profile.last_name}` : '';
    return (
      fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getRequestLabel(request.request_type, request.category).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
          Demandes des Clients
        </h2>
        <div className="flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input
            placeholder="Rechercher une demande..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredRequests.length === 0 ? (
          <Card className="border-blue-200">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500">Aucune demande trouvée</p>
            </CardContent>
          </Card>
        ) : (
          filteredRequests.map((request) => {
            const profile = request.profiles;
            return (
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
                        <CardDescription className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {profile ? `${profile.first_name} ${profile.last_name}` : 'Utilisateur inconnu'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(request.created_at).toLocaleDateString('fr-FR')}
                          </span>
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
                        <p className="text-sm font-medium text-blue-800 mb-1">Réponse actuelle:</p>
                        <p className="text-sm text-blue-700">{request.admin_response}</p>
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-blue-300 text-blue-700 hover:bg-blue-50"
                            onClick={() => {
                              setSelectedRequest(request);
                              setNewStatus(request.status);
                              setAdminResponse(request.admin_response || "");
                            }}
                          >
                            Répondre
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                          <DialogHeader>
                            <DialogTitle>Répondre à la demande</DialogTitle>
                            <DialogDescription>
                              Mettez à jour le statut et ajoutez une réponse pour le client.
                            </DialogDescription>
                          </DialogHeader>
                          
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Statut</label>
                              <Select value={newStatus} onValueChange={setNewStatus}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Sélectionnez le statut" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">En attente</SelectItem>
                                  <SelectItem value="processing">En cours</SelectItem>
                                  <SelectItem value="completed">Terminé</SelectItem>
                                  <SelectItem value="rejected">Rejeté</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>

                            <div>
                              <label className="text-sm font-medium">Réponse (optionnel)</label>
                              <Textarea
                                placeholder="Votre réponse au client..."
                                value={adminResponse}
                                onChange={(e) => setAdminResponse(e.target.value)}
                                rows={4}
                              />
                            </div>

                            <div className="flex justify-end space-x-2">
                              <Button variant="outline">
                                Annuler
                              </Button>
                              <Button onClick={handleUpdateRequest} disabled={isUpdating}>
                                {isUpdating ? "Mise à jour..." : "Mettre à jour"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
