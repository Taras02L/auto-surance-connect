
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

interface SubscriptionData {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  energy: string;
  seats: string;
  horsepower: string;
  carteGriseImage: File | null;
  guarantees: string[];
  insuranceCompanies: string[];
  contractDurations: string[];
}

export const useSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const uploadCarteGrise = async (file: File): Promise<string | null> => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `carte-grise/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file);

      if (uploadError) {
        console.error('Upload error:', uploadError);
        return null;
      }

      const { data } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      return null;
    }
  };

  const createSubscription = async (data: SubscriptionData) => {
    if (!user) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour soumettre une souscription",
        variant: "destructive",
      });
      return false;
    }

    setIsLoading(true);

    try {
      let carteGriseUrl = null;

      // Upload carte grise if provided
      if (data.carteGriseImage) {
        carteGriseUrl = await uploadCarteGrise(data.carteGriseImage);
        if (!carteGriseUrl) {
          toast({
            title: "Erreur",
            description: "Erreur lors du téléchargement de la carte grise",
            variant: "destructive",
          });
          return false;
        }
      }

      // Create subscription record
      const { error } = await supabase.from('subscriptions').insert({
        user_id: user.id,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        address: data.address,
        energy: data.energy,
        seats: parseInt(data.seats),
        horsepower: parseInt(data.horsepower),
        carte_grise_url: carteGriseUrl,
        guarantees: data.guarantees,
        insurance_companies: data.insuranceCompanies,
        contract_durations: data.contractDurations,
      });

      if (error) {
        console.error('Subscription error:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la soumission de la souscription",
          variant: "destructive",
        });
        return false;
      }

      toast({
        title: "Succès",
        description: "Votre souscription a été soumise avec succès !",
      });

      return true;
    } catch (error) {
      console.error('Error creating subscription:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    createSubscription,
    isLoading,
  };
};
