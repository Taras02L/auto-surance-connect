
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Award, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import VehicleTypesCarousel from "@/components/VehicleTypesCarousel";
import ServiceTypesCarousel from "@/components/ServiceTypesCarousel";
import PartnersSection from "@/components/PartnersSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <img src="/images/logo2AL50.png" alt="Logo Autas" className="w-10 h-10" />
              <h1 className="text-2xl font-bold">Autas</h1>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="hover:text-blue-300 transition-colors">Accueil</Link>
              <Link to="/souscription" className="hover:text-blue-300 transition-colors">Souscription</Link>
              <Link to="/about" className="hover:text-blue-300 transition-colors">À propos</Link>
            </nav>
            <div className="flex items-center space-x-3">
              <Link to="/login">
                <Button variant="outline" className="text-blue-900 border-white hover:bg-blue-100">
                  Connexion
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  S'inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Background Image */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div 
          className="absolute inset-0 bg-black opacity-20"
          style={{
            backgroundImage: `url('/images/Photo 1.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-2xl text-white mb-6">Bienvenue sur Autas</h1>
          <h2 className="text-5xl font-bold text-white mb-6">
            L’assurance automobile, réinventée pour vous
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Souscrivez, gérez et renouvelez votre assurance automobile en quelques clics. 
            Profitez aussi de nos services exclusifs : visite technique, entretien, réparation.
            Simple, rapide et sécurisé.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/souscription">
              <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
                Souscrire Maintenant
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Vehicle Types Carousel Section */}
      <VehicleTypesCarousel />

      {/* Features Section with Images */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Pourquoi Choisir Autas ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-80 text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 w-full flex items-center justify-center bg-gray-100">
                <img
                  src="/images/time.png"
                  alt="Icône processus rapide"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-blue-900">Processus rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Souscription et renouvellement simplifiés pour vous faire gagner du temps.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-80 text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 w-full flex items-center justify-center bg-gray-100">
                <img
                  src="/images/espace.png"
                  alt="Icône processus rapide"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-blue-900">Gestion facile</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Accédez à toutes vos polices et détails importants depuis votre espace personnel.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="h-80 text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-32 w-full flex items-center justify-center bg-gray-100">
                <img
                  src="/images/securite.png"
                  alt="Icône processus rapide"
                  className="h-28 w-auto object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle className="text-blue-900">Sécurisé</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Vos informations sont protégées. Gérez vos assurances en toute confiance.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Types Carousel Section */}
      <ServiceTypesCarousel />

      {/* Partners Section */}
      <PartnersSection />


      {/* CTA Section with Background */}
      <section className="relative py-16 px-4 bg-blue-900 text-white">
        <div 
          className="absolute inset-0 bg-blue-900 opacity-90"
          style={{
            backgroundImage: `url('/images/voit.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto text-center relative z-10">
          <h3 className="text-3xl font-bold mb-6">
            Prêt à Protéger Votre Véhicule ?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Rejoignez des milliers de conducteurs qui nous font confiance
          </p>
          <Link to="/souscription">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 text-lg px-8 py-3">
              Commencer Ma Souscription
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/images/logo2AL50.png" alt="Logo 2AL" />
                <h4 className="text-xl font-bold">Autas</h4>
              </div>
              <p className="text-gray-400">
                Votre partenaire de confiance pour l'assurance automobile.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Assurance Auto</li>
                <li>Visite Technique</li>
                <li>Services TVM</li>
                <li>Assistance</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>À propos</li>
                <li>FAQ</li>
                <li>Sinistres</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>+228 90 80 14 66</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@autoassurservice.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Lomé, Togo</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 2AS. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
