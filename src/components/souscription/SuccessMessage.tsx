
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Home, Plus } from "lucide-react";

interface SuccessMessageProps {
  onReturnHome: () => void;
  onNewSubscription: () => void;
}

export const SuccessMessage = ({ onReturnHome, onNewSubscription }: SuccessMessageProps) => {
  return (
    <Card className="border-green-200">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-green-700">
          Demande envoyée avec succès !
        </CardTitle>
        <CardDescription className="text-lg">
          Votre demande a bien été envoyée, un(e) Conseiller(e) Clientèle vous contactera dans un bref délai pour finaliser la souscription.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={onReturnHome}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Home className="w-4 h-4 mr-2" />
            Retour à la page d'accueil
          </Button>
          <Button 
            onClick={onNewSubscription}
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvelle souscription
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
