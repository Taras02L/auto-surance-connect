import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";

const VehicleTypesCarousel = () => {
  const vehicleTypes = [
    {
      id: 1,
      name: "Moto",
      image: "/images/moto.webp", label: "Moto"
    },
    {
      id: 2,
      name: "Voiture personnelle",
      image: "/images/voiture.jpg", label: "Voiture"
    },
    {
      id: 3,
      name: "Taxi",
      image: "/images/taxi.jpg", label: "Taxi"
    },
    {
      id: 4,
      name: "Camion",
      image: "/images/camion.avif", label: "Camion"
    },
    {
      id: 5,
      name: "Bus",
      image: "/images/bus.jpg", label: "Bus"
    },
    {
      id: 6,
      name: "Camionnette",
      image: "/images/camionnette.avif", label: "Camionnette"
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto">
        <h3 className="text-3xl font-bold text-center text-blue-900 mb-12">
          Quels engins souscrire ?
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
              {vehicleTypes.map((vehicle) => (
                <CarouselItem key={vehicle.id} className="pl-2 md:pl-4 md:basis-1/3 lg:basis-1/4">
                  <Card className="border-blue-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="aspect-square relative overflow-hidden rounded-t-lg">
                        <img
                          src={vehicle.image}
                          alt={vehicle.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 text-center">
                        <h4 className="text-lg font-semibold text-blue-900">
                          {vehicle.name}
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

export default VehicleTypesCarousel;