
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { insuranceRequests, additionalServices } from "./request-types";

interface RequestFormProps {
  onRequestSubmitted: () => void;
}

export const RequestForm = ({ onRequestSubmitted }: RequestFormProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    requestType: "",
    category: "",
    description: ""
  });
  const { user } = useAuth();

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
      onRequestSubmitted();
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

  return (
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
  );
};
