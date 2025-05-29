
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminUsers } from "@/components/admin/AdminUsers";
import { AdminSubscriptions } from "@/components/admin/AdminSubscriptions";
import { AdminStats } from "@/components/admin/AdminStats";
import { AdminDocuments } from "@/components/admin/AdminDocuments";
import { Shield, Users, FileText, BarChart3, FolderOpen } from "lucide-react";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const Admin = () => {
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingAdmin(false);
        return;
      }

      try {
        // Use RPC to call our security definer function
        const { data, error } = await supabase.rpc('has_role', {
          _user_id: user.id,
          _role: 'admin' as any
        });

        if (error) {
          console.error('Error checking admin role:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(data === true);
        }
      } catch (error) {
        console.error('Error checking admin role:', error);
        setIsAdmin(false);
      } finally {
        setCheckingAdmin(false);
      }
    };

    checkAdminRole();
  }, [user]);

  if (loading || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2 flex items-center gap-2">
              <Shield className="h-8 w-8" />
              Espace Administrateur
            </h1>
            <p className="text-gray-600">
              Gérez les utilisateurs, souscriptions et consultez les statistiques
            </p>
          </div>

          <Tabs defaultValue="stats" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="stats" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Statistiques
              </TabsTrigger>
              <TabsTrigger value="users" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Utilisateurs
              </TabsTrigger>
              <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Souscriptions
              </TabsTrigger>
              <TabsTrigger value="documents" className="flex items-center gap-2">
                <FolderOpen className="h-4 w-4" />
                Documents
              </TabsTrigger>
            </TabsList>

            <TabsContent value="stats">
              <AdminStats />
            </TabsContent>

            <TabsContent value="users">
              <AdminUsers />
            </TabsContent>

            <TabsContent value="subscriptions">
              <AdminSubscriptions />
            </TabsContent>

            <TabsContent value="documents">
              <AdminDocuments />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Admin;
