import { Heart, Facebook, Twitter, Instagram } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const footerSections = [
    {
      title: "Recovery Resources",
      links: [
        { label: "Immediate Recovery", href: "/recovery-phases?phase=immediate" },
        { label: "Short-term Recovery", href: "/recovery-phases?phase=short-term" },
        { label: "Long-term Recovery", href: "/recovery-phases?phase=long-term" },
        { label: "Symptom Guides", href: "/resources?category=symptom-guides" },
      ]
    },
    {
      title: "Family Support",
      links: [
        { label: "Caregiver Resources", href: "/family-support#caregiver" },
        { label: "Support Groups", href: "/family-support#support-groups" },
        { label: "Communication Tips", href: "/family-support#communication" },
        { label: "Self-Care Guides", href: "/family-support#self-care" },
      ]
    },
    {
      title: "About",
      links: [
        { label: "Our Mission", href: "/about" },
        { label: "Medical Advisory Board", href: "/advisory-board" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ]
    }
  ];

  return (
    <footer className="bg-foreground text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">Recovery Path</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering ICU recovery patients and families with comprehensive educational resources and support.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-white transition-colors duration-300"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h4 className="text-lg font-semibold">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-600 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-300 text-sm text-center md:text-left">
              &copy; 2024 Recovery Path. All rights reserved. | Medical information is for educational purposes only.
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm">
              <Link href="/privacy" className="text-gray-300 hover:text-white transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white transition-colors duration-300">
                Terms of Service
              </Link>
              <Link href="/accessibility" className="text-gray-300 hover:text-white transition-colors duration-300">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
