
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from "lucide-react";

interface VehicleInfoStepProps {
  formData: {
    energy: string;
    seats: string;
    horsepower: string;
    carteGriseImage: File | null;
  };
  onInputChange: (field: string, value: string) => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
  imagePreview: string | null;
}

export const VehicleInfoStep = ({ 
  formData, 
  onInputChange, 
  onImageUpload, 
  onRemoveImage, 
  imagePreview 
}: VehicleInfoStepProps) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-4">
        Informations du véhicule
      </h3>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="energy">Énergie *</Label>
          <Select value={formData.energy} onValueChange={(value) => onInputChange("energy", value)}>
            <SelectTrigger className="border-blue-200 focus:border-blue-500">
              <SelectValue placeholder="Sélectionnez" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="essence">Essence</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="electrique">Électrique</SelectItem>
              <SelectItem value="hybride">Hybride</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="seats">Nombre de places *</Label>
          <Input
            id="seats"
            type="number"
            min="2"
            max="50"
            value={formData.seats}
            onChange={(e) => onInputChange("seats", e.target.value)}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="horsepower">Nombre de chevaux (Puissance) *</Label>
          <Input
            id="horsepower"
            type="number"
            min="1"
            value={formData.horsepower}
            onChange={(e) => onInputChange("horsepower", e.target.value)}
            required
            className="border-blue-200 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="carteGrise">Carte grise *</Label>
        <div className="border-2 border-dashed border-blue-200 rounded-lg p-6">
          {!imagePreview ? (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-blue-400" />
              <div className="mt-2">
                <label htmlFor="carteGrise" className="cursor-pointer">
                  <span className="text-blue-600 hover:text-blue-500">
                    Cliquez pour télécharger
                  </span>
                  <input
                    id="carteGrise"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={onImageUpload}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500">PNG, JPG, PDF jusqu'à 10MB</p>
              <p className="text-xs text-red-500 mt-1">* Champ obligatoire</p>
            </div>
          ) : (
            <div className="relative">
              {formData.carteGriseImage?.type?.startsWith('image/') ? (
                <img
                  src={imagePreview}
                  alt="Carte grise"
                  className="max-w-full h-auto rounded-lg"
                />
              ) : (
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2">{formData.carteGriseImage?.name}</p>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={onRemoveImage}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
