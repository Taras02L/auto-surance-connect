import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const PartnersSection = () => {
  const partners = [
    {
      id: 1,
      name: "Sanlam",
      logo: "/images/sanlam.png", label: "Sanlam Assurance"
    },
    {
      id: 2,
      name: "SUNU",
      logo: "/images/sunu.jpg", label: "SUNU Assurance"
    },
    {
      id: 3,
      name: "GTA",
      logo: "/images/gta.png", label: "GTA Assurance"
    },
    {
      id: 4,
      name: "Fidelia",
      logo: "/images/fidelia.jpeg", label: "Fidelia Assurance"
    },
    {
      id: 5,
      name: "NSIA",
      logo: "/images/nsia.png", label: "NSIA Assurance"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Nos Partenaires
        </h3>
        <div className="w-full">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {partners.map((partner) => (
                <CarouselItem key={partner.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/5">
                  <Card className="border-blue-200 hover:shadow-lg transition-shadow bg-white">
                    <CardContent className="p-6">
                      <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="text-lg font-semibold text-blue-900">
                          {partner.name}
                        </h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;