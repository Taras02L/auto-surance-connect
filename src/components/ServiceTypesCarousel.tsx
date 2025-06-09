import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const ServiceTypesCarousel = () => {
  const serviceTypes = [
    {
      id: 1,
      name: "Visite technique",
      image: "/images/visitetech.jpg", label: "Visite technique"
    },
    {
      id: 2,
      name: "Taxe sur les véhicules à moteur",
      image: "/images/tvm.jpg", label: "Taxe sur les véhicules à moteur"
    },
    {
      id: 3,
      name: "Mécanique",
      image: "/images/mecanique.jpeg", label: "Mécanique auto"
    },
    {
      id: 4,
      name: "Electricité",
      image: "/images/electricite.jpg", label: "Electricité"
    },
    {
      id: 5,
      name: "Carosserie",
      image: "/images/carosserie.jpg", label: "Carosserie auto"
    },
    {
      id: 6,
      name: "Peinture",
      image: "/images/peinture.png", label: "Peinture auto"
    },
    {
        id: 6,
        name: "Lavage",
        image: "/images/lavage.jpg", label: "Lavage auto"
    },
    {
        id: 6,
        name: "Vulcanisation",
        image: "/images/vulcanisation.avif", label: "Vulcanisation auto"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Services exclusifs
        </h3>
        <div className="w-full">
          <Carousel 
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 3000,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {serviceTypes.map((service) => (
                <CarouselItem key={service.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={service.image}
                          alt={service.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-lg font-semibold text-blue-900">
                          {service.name}
                        </h4>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex" />
            <CarouselNext className="hidden md:flex" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default ServiceTypesCarousel;