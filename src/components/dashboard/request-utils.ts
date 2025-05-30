
import { insuranceRequests, additionalServices } from "./request-types";
import { Badge } from "@/components/ui/badge";

export const getRequestLabel = (type: string, category: string) => {
  const allOptions = [...insuranceRequests, ...additionalServices];
  const option = allOptions.find(opt => opt.value === category);
  return option ? option.label : category;
};

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    pending: { label: "En attente", variant: "secondary" as const },
    processing: { label: "En cours", variant: "default" as const },
    completed: { label: "Terminé", variant: "default" as const },
    rejected: { label: "Rejeté", variant: "destructive" as const }
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge variant={config.variant}>{config.label}</Badge>;
};
