
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Car } from "lucide-react";
import { ClientRequest } from "./request-types";
import { getRequestLabel, getStatusBadge } from "./request-utils";

interface RequestCardProps {
  request: ClientRequest;
}

export const RequestCard = ({ request }: RequestCardProps) => {
  return (
    <Card className="border-blue-200">
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
              <CardDescription>
                {new Date(request.created_at).toLocaleDateString('fr-FR')}
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
              <p className="text-sm font-medium text-blue-800 mb-1">Réponse de l'assureur:</p>
              <p className="text-sm text-blue-700">{request.admin_response}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
