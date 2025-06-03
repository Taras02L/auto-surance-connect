
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Car, Calendar, User } from "lucide-react";
import { getRequestLabel, getStatusBadge } from "../../dashboard/request-utils";
import { ClientRequestWithProfile } from "./types";

interface ClientRequestCardProps {
  request: ClientRequestWithProfile;
  onRespond: (request: ClientRequestWithProfile) => void;
}

export const ClientRequestCard = ({ request, onRespond }: ClientRequestCardProps) => {
  const profile = request.profiles;

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
              <CardDescription className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {profile ? `${profile.first_name} ${profile.last_name}` : 'Utilisateur inconnu'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(request.created_at).toLocaleDateString('fr-FR')}
                </span>
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
              <p className="text-sm font-medium text-blue-800 mb-1">Réponse actuelle:</p>
              <p className="text-sm text-blue-700">{request.admin_response}</p>
            </div>
          )}

          <div className="flex justify-end">
            <Button 
              variant="outline" 
              size="sm"
              className="border-blue-300 text-blue-700 hover:bg-blue-50"
              onClick={() => onRespond(request)}
            >
              Répondre
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
