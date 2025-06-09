
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Award, Heart, Target, Eye } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-800">
        <div 
          className="absolute inset-0 bg-black opacity-30"
          style={{
            backgroundImage: `url('/images/apropos.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6">
            À Propos de 2AS
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Votre partenaire de confiance pour l'assurance automobile au Togo.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="border-blue-200">
              <CardHeader className="text-center">
                <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-blue-900">Notre Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Fournir des solutions d'assurance automobile accessibles, fiables et innovantes 
                  pour protéger nos clients sur les routes du Togo. Nous nous engageons à simplifier 
                  le processus d'assurance tout en offrant un service client exceptionnel.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="text-center">
                <Eye className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-2xl text-blue-900">Notre Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center leading-relaxed">
                  Devenir la référence en matière d'assurance automobile au Togo, 
                  en étant reconnus pour notre innovation technologique, notre transparence 
                  et notre engagement envers la satisfaction de nos clients.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Nos Valeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Confiance</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nous construisons des relations durables basées sur la transparence, 
                  l'honnêteté et la fiabilité de nos services.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Service Client</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Chaque client est unique. Nous offrons un accompagnement personnalisé 
                  et un support disponible quand vous en avez besoin.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Excellence</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Nous nous efforçons continuellement d'améliorer nos services 
                  et de dépasser les attentes de nos clients.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">
              Notre Histoire
            </h2>
            <div className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-blue-600">
              <p className="text-gray-600 leading-relaxed mb-6">
                Fondée en 2014, 2AL Insurance est née de la vision de démocratiser l'accès 
                à l'assurance automobile au Togo. Nos fondateurs, conscients des défis que 
                rencontraient les conducteurs togolais pour souscrire une assurance, ont créé 
                une plateforme innovante et accessible.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Au fil des années, nous avons développé un écosystème complet de services 
                allant de l'assurance automobile aux services techniques (visite technique, TVM) 
                en passant par l'entretien et le lavage de véhicules.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Aujourd'hui, 2AL Insurance compte plus de 15 000 clients satisfaits et 
                continue d'innover pour offrir les meilleures solutions d'assurance automobile au Togo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
            Notre Engagement
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-blue-200">
              <CardHeader className="text-center">
                <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Pour Nos Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>• Transparence totale dans nos tarifs et conditions</li>
                  <li>• Support client disponible 6j/7</li>
                  <li>• Traitement rapide des sinistres</li>
                  <li>• Innovation continue de nos services</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader className="text-center">
                <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-blue-900">Pour la Communauté</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-gray-600">
                  <li>• Sensibilisation à la sécurité routière</li>
                  <li>• Partenariats avec les entreprises locales</li>
                  <li>• Formation de nos équipes</li>
                  <li>• Contribution au développement économique</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
