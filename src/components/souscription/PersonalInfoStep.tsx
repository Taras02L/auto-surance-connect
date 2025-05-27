
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PersonalInfoStepProps {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoStep = ({ formData, onInputChange }: PersonalInfoStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Vos informations personnelles
      </h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => onInputChange("firstName", e.target.value)}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => onInputChange("lastName", e.target.value)}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Téléphone *</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+22870443322"
          value={formData.phone}
          onChange={(e) => onInputChange("phone", e.target.value)}
          required
          className="border-blue-200 focus:border-blue-500"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">Adresse *</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => onInputChange("address", e.target.value)}
          required
          className="border-blue-200 focus:border-blue-500"
        />
      </div>
    </div>
  );
};
