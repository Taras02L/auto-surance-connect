
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { ClientRequestWithProfile } from "./types";

interface RequestResponseDialogProps {
  isOpen: boolean;
  onClose: () => void;
  request: ClientRequestWithProfile | null;
  onRequestUpdated: () => void;
}

export const RequestResponseDialog = ({
  isOpen,
  onClose,
  request,
  onRequestUpdated
}: RequestResponseDialogProps) => {
  const [adminResponse, setAdminResponse] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdateRequest = async () => {
    if (!request || !newStatus) {
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
        .eq('id', request.id);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "La demande a été mise à jour",
      });

      onClose();
      setAdminResponse("");
      setNewStatus("");
      onRequestUpdated();
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

  if (!request) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
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
            <Button variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button onClick={handleUpdateRequest} disabled={isUpdating}>
              {isUpdating ? "Mise à jour..." : "Mettre à jour"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
