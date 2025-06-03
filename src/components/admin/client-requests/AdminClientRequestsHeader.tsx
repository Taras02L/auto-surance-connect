
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface AdminClientRequestsHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const AdminClientRequestsHeader = ({ 
  searchTerm, 
  onSearchChange 
}: AdminClientRequestsHeaderProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold text-blue-900">
        Demandes des Clients
      </h2>
      <div className="flex items-center space-x-2">
        <Search className="h-4 w-4 text-gray-400" />
        <Input
          placeholder="Rechercher une demande..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-64"
        />
      </div>
    </div>
  );
};
