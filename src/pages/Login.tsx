
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement authentication logic
    console.log("Login attempt:", { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2">
            <Shield className="h-10 w-10 text-blue-600" />
            <h1 className="text-3xl font-bold text-blue-900">2AL Insurance</h1>
          </Link>
        </div>

        <Card className="border-blue-200">
          <CardHeader>
            <CardTitle className="text-2xl text-center text-blue-900">Connexion</CardTitle>
            <CardDescription className="text-center">
              Accédez à votre espace personnel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email ou Téléphone</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="email@exemple.com ou +22870443322"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-blue-200 focus:border-blue-500"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Se connecter
              </Button>
            </form>

            <div className="mt-6 text-center space-y-4">
              <Link 
                to="/forgot-password" 
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Mot de passe oublié ?
              </Link>
              
              <div className="text-sm text-gray-600">
                Pas encore de compte ?{" "}
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  S'inscrire
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
