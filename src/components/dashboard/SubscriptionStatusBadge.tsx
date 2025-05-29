
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, XCircle, Settings } from "lucide-react";
import { getStatusInfo } from "./subscription-utils";

interface SubscriptionStatusBadgeProps {
  status: string;
}

export const SubscriptionStatusBadge = ({ status }: SubscriptionStatusBadgeProps) => {
  const statusInfo = getStatusInfo(status);
  
  const getStatusIcon = (status: string) => {
    const icons = {
      pending: Clock,
      in_review: Settings,
      processing: Settings,
      approved: CheckCircle,
      rejected: XCircle,
    };
    return icons[status as keyof typeof icons] || Clock;
  };

  const Icon = getStatusIcon(status);

  return (
    <Badge variant="outline" className={statusInfo.color}>
      <Icon className="h-3 w-3 mr-1" />
      {statusInfo.label}
    </Badge>
  );
};
