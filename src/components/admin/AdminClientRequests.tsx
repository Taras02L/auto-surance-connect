
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { getRequestLabel } from "../dashboard/request-utils";
import { AdminClientRequestsHeader } from "./client-requests/AdminClientRequestsHeader";
import { ClientRequestCard } from "./client-requests/ClientRequestCard";
import { RequestResponseDialog } from "./client-requests/RequestResponseDialog";
import { EmptyRequestsState } from "./client-requests/EmptyRequestsState";
import { ClientRequestWithProfile } from "./client-requests/types";

export const AdminClientRequests = () => {
  const [requests, setRequests] = useState<ClientRequestWithProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequest, setSelectedRequest] = useState<ClientRequestWithProfile | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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
      setRequests((data as ClientRequestWithProfile[]) || []);
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

  const handleRespond = (request: ClientRequestWithProfile) => {
    setSelectedRequest(request);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedRequest(null);
    setIsDialogOpen(false);
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
      <AdminClientRequestsHeader 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <div className="grid gap-6">
        {filteredRequests.length === 0 ? (
          <EmptyRequestsState />
        ) : (
          filteredRequests.map((request) => (
            <ClientRequestCard
              key={request.id}
              request={request}
              onRespond={handleRespond}
            />
          ))
        )}
      </div>

      <RequestResponseDialog
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        request={selectedRequest}
        onRequestUpdated={fetchRequests}
      />
    </div>
  );
};
