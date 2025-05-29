
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Eye, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface DocumentData {
  id: string;
  name: string;
  created_at: string;
  metadata: any;
  updated_at: string;
}

interface SubscriptionWithDocument {
  id: string;
  first_name: string;
  last_name: string;
  carte_grise_url: string | null;
  created_at: string;
}

export const AdminDocuments = () => {
  const [documents, setDocuments] = useState<DocumentData[]>([]);
  const [subscriptions, setSubscriptions] = useState<SubscriptionWithDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  useEffect(() => {
    fetchDocumentsAndSubscriptions();
  }, []);

  const fetchDocumentsAndSubscriptions = async () => {
    try {
      setLoading(true);
      
      // Fetch all documents from storage
      const { data: files, error: filesError } = await supabase.storage
        .from('documents')
        .list('carte-grise', {
          limit: 100,
          offset: 0,
        });

      if (filesError) {
        console.error('Error fetching files:', filesError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les documents",
          variant: "destructive",
        });
        return;
      }

      // Fetch subscriptions with carte grise URLs
      const { data: subsData, error: subsError } = await supabase
        .from('subscriptions')
        .select('id, first_name, last_name, carte_grise_url, created_at')
        .not('carte_grise_url', 'is', null);

      if (subsError) {
        console.error('Error fetching subscriptions:', subsError);
        toast({
          title: "Erreur",
          description: "Impossible de charger les souscriptions",
          variant: "destructive",
        });
        return;
      }

      setDocuments(files || []);
      setSubscriptions(subsData || []);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur inattendue s'est produite",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const downloadDocument = async (fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('documents')
        .download(`carte-grise/${fileName}`);

      if (error) {
        console.error('Download error:', error);
        toast({
          title: "Erreur",
          description: "Impossible de télécharger le document",
          variant: "destructive",
        });
        return;
      }

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast({
        title: "Succès",
        description: "Document téléchargé avec succès",
      });
    } catch (error) {
      console.error('Error downloading:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du téléchargement",
        variant: "destructive",
      });
    }
  };

  const getPublicUrl = (fileName: string) => {
    const { data } = supabase.storage
      .from('documents')
      .getPublicUrl(`carte-grise/${fileName}`);
    return data.publicUrl;
  };

  const deleteDocument = async (fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from('documents')
        .remove([`carte-grise/${fileName}`]);

      if (error) {
        console.error('Delete error:', error);
        toast({
          title: "Erreur",
          description: "Impossible de supprimer le document",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: "Document supprimé avec succès",
      });

      // Refresh the list
      fetchDocumentsAndSubscriptions();
    } catch (error) {
      console.error('Error deleting:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de la suppression",
        variant: "destructive",
      });
    }
  };

  const findSubscriptionForDocument = (fileName: string) => {
    return subscriptions.find(sub => 
      sub.carte_grise_url?.includes(fileName)
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-blue-900">
          Gestion des Documents
        </h2>
        <Button onClick={fetchDocumentsAndSubscriptions} variant="outline">
          Actualiser
        </Button>
      </div>

      <div className="grid gap-4">
        {documents.length === 0 ? (
          <Card>
            <CardContent className="py-8">
              <p className="text-center text-gray-500">
                Aucun document trouvé
              </p>
            </CardContent>
          </Card>
        ) : (
          documents.map((doc) => {
            const subscription = findSubscriptionForDocument(doc.name);
            return (
              <Card key={doc.id} className="border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-600" />
                      <span className="text-lg">{doc.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Voir
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl">
                          <DialogHeader>
                            <DialogTitle>Aperçu - {doc.name}</DialogTitle>
                          </DialogHeader>
                          <div className="flex justify-center">
                            <img
                              src={getPublicUrl(doc.name)}
                              alt="Carte grise"
                              className="max-w-full max-h-96 object-contain"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                e.currentTarget.parentElement!.innerHTML = 
                                  '<p class="text-gray-500">Impossible d\'afficher l\'aperçu</p>';
                              }}
                            />
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadDocument(doc.name)}
                      >
                        <Download className="h-4 w-4 mr-1" />
                        Télécharger
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteDocument(doc.name)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Supprimer
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">
                        <strong>Date d'upload:</strong>{' '}
                        {new Date(doc.created_at).toLocaleDateString('fr-FR')}
                      </p>
                      <p className="text-sm text-gray-600">
                        <strong>Taille:</strong>{' '}
                        {doc.metadata?.size 
                          ? `${(doc.metadata.size / 1024 / 1024).toFixed(2)} MB`
                          : 'Inconnue'
                        }
                      </p>
                    </div>
                    {subscription && (
                      <div>
                        <p className="text-sm text-gray-600">
                          <strong>Client:</strong>{' '}
                          {subscription.first_name} {subscription.last_name}
                        </p>
                        <p className="text-sm text-gray-600">
                          <strong>Souscription:</strong>{' '}
                          {new Date(subscription.created_at).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
};
