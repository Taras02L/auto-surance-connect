
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, CheckCircle } from "lucide-react";

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
  const isValidImageType = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
    return validTypes.includes(file.type);
  };

  const getFileSize = (file: File) => {
    const sizeInMB = file.size / (1024 * 1024);
    return sizeInMB.toFixed(2);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!isValidImageType(file)) {
        alert('Format de fichier non supporté. Veuillez choisir une image (JPG, PNG, GIF) ou un PDF.');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('Le fichier est trop volumineux. La taille maximale autorisée est de 10MB.');
        return;
      }
      
      onImageUpload(e);
    }
  };

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
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <p className="text-sm text-gray-500 mt-2">PNG, JPG, PDF jusqu'à 10MB</p>
              <p className="text-xs text-red-500 mt-1">* Champ obligatoire</p>
              <div className="mt-3 text-xs text-gray-400">
                <p>✓ Formats acceptés: JPG, PNG, GIF, PDF</p>
                <p>✓ Taille maximum: 10MB</p>
                <p>✓ Document sécurisé et crypté</p>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                <span className="text-green-600 font-medium">Document téléchargé avec succès</span>
              </div>
              
              {formData.carteGriseImage?.type?.startsWith('image/') ? (
                <img
                  src={imagePreview}
                  alt="Carte grise"
                  className="max-w-full h-auto rounded-lg mx-auto"
                  style={{ maxHeight: '300px' }}
                />
              ) : (
                <div className="flex items-center justify-center p-4 bg-gray-100 rounded-lg">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="text-sm text-gray-600 mt-2 font-medium">{formData.carteGriseImage?.name}</p>
                    {formData.carteGriseImage && (
                      <p className="text-xs text-gray-500 mt-1">
                        Taille: {getFileSize(formData.carteGriseImage)} MB
                      </p>
                    )}
                  </div>
                </div>
              )}
              
              <div className="flex justify-center mt-4 gap-2">
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="flex items-center px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 text-sm"
                >
                  <X className="h-4 w-4 mr-1" />
                  Supprimer
                </button>
                <label htmlFor="carteGrise-replace" className="cursor-pointer">
                  <span className="flex items-center px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm">
                    <Upload className="h-4 w-4 mr-1" />
                    Remplacer
                  </span>
                  <input
                    id="carteGrise-replace"
                    type="file"
                    accept="image/*,.pdf"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
