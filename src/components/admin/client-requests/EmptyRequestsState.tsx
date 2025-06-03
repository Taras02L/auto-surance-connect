
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export const EmptyRequestsState = () => {
  return (
    <Card className="border-blue-200">
      <CardContent className="flex flex-col items-center justify-center py-8">
        <MessageSquare className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-gray-500">Aucune demande trouvée</p>
      </CardContent>
    </Card>
  );
};
