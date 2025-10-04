import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Wifi, Coffee, Car, Dumbbell, Shield } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet throughout the hotel' },
    { icon: Coffee, title: 'Breakfast', description: 'Complimentary breakfast buffet' },
    { icon: Car, title: 'Parking', description: 'Free secure parking for guests' },
    { icon: Dumbbell, title: 'Fitness', description: '24/7 access to modern gym' },
    { icon: Shield, title: 'Security', description: 'Round-the-clock security' },
    { icon: Sparkles, title: 'Luxury', description: 'Premium amenities & service' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjRkZGIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center space-y-6 animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Welcome to <span className="text-accent">LuxStay Hotel</span>
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Experience unparalleled luxury and comfort in the heart of the city
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                onClick={() => navigate('/booking')}
                className="bg-accent hover:bg-accent-glow text-accent-foreground shadow-accent text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
              >
                Book Your Stay
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/guests')}
                className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 transition-all duration-300"
              >
                View Bookings
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose LuxStay?</h2>
            <p className="text-muted-foreground text-lg">Premium amenities and services for an unforgettable stay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 animate-scale-in border-2 hover:border-primary/50"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-4 bg-gradient-primary rounded-2xl shadow-glow">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Room Types Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Rooms</h2>
            <p className="text-muted-foreground text-lg">Choose from our carefully designed room categories</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {['Single', 'Double', 'Deluxe', 'Suite'].map((room, index) => (
              <Card
                key={room}
                className="group overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate('/booking')}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-video bg-gradient-primary relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/80 to-accent/80 flex items-center justify-center">
                    <span className="text-4xl font-bold text-primary-foreground">{room}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    {room} Room
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    Perfect for {room === 'Single' ? 'solo travelers' : room === 'Suite' ? 'luxury seekers' : 'couples'}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    Book Now
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold">Ready for an Unforgettable Experience?</h2>
          <p className="text-xl text-primary-foreground/90">
            Book your room today and enjoy exclusive benefits
          </p>
          <Button
            size="lg"
            onClick={() => navigate('/booking')}
            className="bg-accent hover:bg-accent-glow text-accent-foreground shadow-accent text-lg px-8 py-6 transition-all duration-300 hover:scale-105"
          >
            Book Now
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
