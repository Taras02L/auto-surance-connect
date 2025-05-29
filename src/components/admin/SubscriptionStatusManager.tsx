
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { CheckCircle, Clock, AlertCircle, XCircle, Settings } from "lucide-react";

interface SubscriptionStatusManagerProps {
  subscriptionId: string;
  currentStatus: string;
  currentComments: string | null;
  onStatusUpdate: () => void;
}

export const SubscriptionStatusManager = ({ 
  subscriptionId, 
  currentStatus, 
  currentComments, 
  onStatusUpdate 
}: SubscriptionStatusManagerProps) => {
  const [status, setStatus] = useState(currentStatus);
  const [comments, setComments] = useState(currentComments || "");
  const [isUpdating, setIsUpdating] = useState(false);
  const { user } = useAuth();

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

  const handleUpdateStatus = async () => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour modifier le statut",
        variant: "destructive",
      });
      return;
    }

    setIsUpdating(true);
    try {
      const { error } = await supabase
        .from('subscriptions')
        .update({
          status: status as any,
          admin_comments: comments || null,
          updated_by: user.id,
          updated_at: new Date().toISOString()
        })
        .eq('id', subscriptionId);

      if (error) throw error;

      toast({
        title: "Succès",
        description: "Le statut de la souscription a été mis à jour",
      });

      onStatusUpdate();
    } catch (error) {
      console.error('Error updating subscription status:', error);
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le statut",
        variant: "destructive",
      });
    } finally {
      setIsUpdating(false);
    }
  };

  const currentStatusDisplay = getStatusDisplay(currentStatus);
  const StatusIcon = currentStatusDisplay.icon;

  return (
    <div className="space-y-4 p-4 border border-blue-200 rounded-lg bg-blue-50">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-blue-900">Gestion du statut</h4>
        <Badge className={currentStatusDisplay.color}>
          <StatusIcon className="h-3 w-3 mr-1" />
          {currentStatusDisplay.label}
        </Badge>
      </div>

      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">
            Nouveau statut
          </label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="border-blue-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {option.label}
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-blue-900">
            Commentaires administrateur
          </label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Ajouter des commentaires sur cette souscription..."
            className="border-blue-200 focus:border-blue-500"
            rows={3}
          />
        </div>

        <Button
          onClick={handleUpdateStatus}
          disabled={isUpdating || status === currentStatus}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isUpdating ? "Mise à jour..." : "Mettre à jour le statut"}
        </Button>
      </div>
    </div>
  );
};
