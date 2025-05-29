
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptySubscriptionsState = () => {
  return (
    <Card>
      <CardContent className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Aucune souscription
        </h3>
        <p className="text-gray-600 mb-4">
          Vous n'avez pas encore de souscription d'assurance.
        </p>
        <Button asChild>
          <Link to="/souscription">
            Créer ma première souscription
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};
