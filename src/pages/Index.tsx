
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, FileText, Award, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header/Navigation */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-blue-300" />
              <h1 className="text-2xl font-bold">2AL Insurance</h1>
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
            backgroundImage: `url('https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold text-white mb-6">
            Votre Assurance Auto en Quelques Clics
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Souscrivez facilement à votre assurance automobile avec 2AL. 
            Des garanties complètes, des tarifs compétitifs et un service client de qualité.
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

      {/* Features Section with Images */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Pourquoi Choisir 2AL Insurance ?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}></div>
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Protection Complète</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Responsabilité civile, protection conducteur, vol, incendie... 
                  Toutes les garanties pour votre tranquillité d'esprit.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}></div>
              <CardHeader>
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Souscription Rapide</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Formulaire simplifié, traitement immédiat et activation rapide 
                  de votre police d'assurance.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 bg-cover bg-center" style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80')`
              }}></div>
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Espace Personnel</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Gérez vos polices, suivez vos demandes et accédez à tous 
                  nos services depuis votre espace dédié.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Visual Appeal */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Nos Services Complémentaires
          </h3>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { 
                name: "Visite Technique", 
                icon: Award,
                image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              { 
                name: "TVM", 
                icon: FileText,
                image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              { 
                name: "Lavage Auto", 
                icon: Shield,
                image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              },
              { 
                name: "Mécanique", 
                icon: Users,
                image: "https://images.unsplash.com/photo-1486754735734-325b5831c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
            ].map((service, index) => (
              <Card key={index} className="text-center hover:shadow-md transition-shadow overflow-hidden">
                <div className="h-32 bg-cover bg-center" style={{
                  backgroundImage: `url('${service.image}')`
                }}></div>
                <CardHeader>
                  <service.icon className="h-10 w-10 text-blue-600 mx-auto" />
                  <CardTitle className="text-lg text-blue-900">{service.name}</CardTitle>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Background */}
      <section className="relative py-16 px-4 bg-blue-900 text-white">
        <div 
          className="absolute inset-0 bg-blue-900 opacity-90"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80')`,
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
                <Shield className="h-6 w-6 text-blue-400" />
                <h4 className="text-xl font-bold">2AL Insurance</h4>
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
                  <span>+228 70 44 33 22</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@2al-insurance.tg</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Lomé, Togo</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 2AL Insurance. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
