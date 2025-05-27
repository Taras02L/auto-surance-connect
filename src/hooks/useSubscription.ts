
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
      console.log('Starting file upload for:', file.name);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;
      const filePath = `carte-grise/${fileName}`;

      console.log('Uploading to path:', filePath);

      const { data, error: uploadError } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        toast({
          title: "Erreur de téléchargement",
          description: `Erreur lors du téléchargement: ${uploadError.message}`,
          variant: "destructive",
        });
        return null;
      }

      console.log('Upload successful:', data);

      const { data: urlData } = supabase.storage
        .from('documents')
        .getPublicUrl(filePath);

      console.log('Public URL generated:', urlData.publicUrl);
      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite lors du téléchargement",
        variant: "destructive",
      });
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
    console.log('Starting subscription creation for user:', user.id);

    try {
      let carteGriseUrl = null;

      // Upload carte grise if provided
      if (data.carteGriseImage) {
        console.log('Uploading carte grise image...');
        carteGriseUrl = await uploadCarteGrise(data.carteGriseImage);
        if (!carteGriseUrl) {
          setIsLoading(false);
          return false;
        }
        console.log('Carte grise uploaded successfully:', carteGriseUrl);
      }

      console.log('Creating subscription record...');
      
      // Create subscription record
      const { data: subscriptionData, error } = await supabase.from('subscriptions').insert({
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
        console.error('Subscription creation error:', error);
        toast({
          title: "Erreur",
          description: `Erreur lors de la soumission: ${error.message}`,
          variant: "destructive",
        });
        return false;
      }

      console.log('Subscription created successfully:', subscriptionData);

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
