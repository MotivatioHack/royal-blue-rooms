import { Hotel, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-card border-t mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-gradient-primary rounded-lg shadow-glow">
                <Hotel className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold">LuxStay Hotel</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Experience luxury and comfort at its finest. Your perfect stay awaits.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Book Room
                </Link>
              </li>
              <li>
                <Link to="/guests" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  View Bookings
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span>123 Hotel Street, City</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                <span>+1 234 567 8900</span>
              </li>
              <li className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                <span>info@luxstay.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elegant"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elegant"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elegant"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="p-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-elegant"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} LuxStay Hotel. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
