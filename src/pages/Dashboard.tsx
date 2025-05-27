
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserSubscriptions } from "@/components/dashboard/UserSubscriptions";
import { UserProfile } from "@/components/dashboard/UserProfile";
import { Shield, FileText, User } from "lucide-react";
import { Navigate } from "react-router-dom";

const Dashboard = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-900 mb-2">
              Espace Personnel
            </h1>
            <p className="text-gray-600">
              Gérez vos souscriptions et votre profil
            </p>
          </div>

          <Tabs defaultValue="subscriptions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="subscriptions" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mes Souscriptions
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Mon Profil
              </TabsTrigger>
            </TabsList>

            <TabsContent value="subscriptions">
              <UserSubscriptions />
            </TabsContent>

            <TabsContent value="profile">
              <UserProfile />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
