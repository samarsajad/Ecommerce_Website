import { Facebook, Twitter } from 'lucide-react';
import Link from 'next/link';

const FooterLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href} className="text-gray-600 hover:text-blue-600 text-sm transition-colors">
    {children}
  </Link>
);

const FooterSection = ({ title, links }: { title: string; links: { href: string; label: string }[] }) => (
  <div>
    <h3 className="font-bold text-gray-800 mb-4">{title}</h3>
    <div className="flex flex-col space-y-3">
      {links.map(link => <FooterLink key={link.label} href={link.href}>{link.label}</FooterLink>)}
    </div>
  </div>
);

export const Footer = () => {
  const sections = {
    Information: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Information' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
    ],
    Service: [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Information' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
    ],
    'My Account': [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Information' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
    ],
    'Our Offers': [
      { href: '#', label: 'About Us' },
      { href: '#', label: 'Information' },
      { href: '#', label: 'Privacy Policy' },
      { href: '#', label: 'Terms & Conditions' },
    ],
  };

  return (
    <footer className="bg-blue-100 pt-16 pb-6">
      <div className="container mx-auto px-6">
        {/* Top section with info and links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* E-Comm Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 text-3xl font-bold text-blue-600">
          <img 
            src="https://placehold.co/40x40/60A5FA/FFFFFF?text=E" 
            alt="E-Comm logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>E-Comm</span>
        </Link>
            <p className="text-gray-600 text-sm leading-relaxed">
              E-Comm is a leading e-commerce platform providing a wide range of products to customers worldwide.
            </p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Follow Us</h3>
            <p className="text-gray-600 text-sm mb-4">
                Join us on social media for the latest updates and offers.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-blue-600 hover:text-primary-blue">
                
                <Facebook size={20} className="fill-current" />
              </Link>
              <Link href="#" className="text-blue-600 hover:text-primary-blue">
                
                <Twitter size={20} className="fill-current" />
              </Link>
            </div>
          </div>
          
          {/* Contact Us */}
          <div>
            <h3 className="font-bold text-gray-800 mb-4">Contact Us</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              E-Comm, 4578 <br/>
              Marmora Road, <br/>
              Glasgow D04 89GR
            </p>
          </div>
        </div>

        {/* Link sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <FooterSection title="Information" links={sections.Information} />
          <FooterSection title="Service" links={sections.Service} />
          <FooterSection title="My Account" links={sections['My Account']} />
          <FooterSection title="Our Offers" links={sections['Our Offers']} />
        </div>

        {/* Bottom bar with copyright and payment icons */}
        <div className="border-t border-blue-200 pt-6 flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2018 Ecommerce theme by www.bisenbaev.com
          </p>
          <div className="flex items-center space-x-4">
            <img src="products/mastercard.webp" alt="Mastercard" className="h-6 rounded-sm" />
            <img src="products/visa.webp" alt="Visa" className="h-6 rounded-sm" />
            <img src="products/paypal.webp" alt="PayPal" className="h-6 rounded-sm" />
          </div>
        </div>
      </div>
    </footer>
  );
};

