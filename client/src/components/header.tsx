import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Menu, X, Heart, Phone, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { href: "/", label: "Home" },
    { href: "/recovery-phases", label: "Recovery Phases" },
    { href: "/resources", label: "Resources" },
    { href: "/family-support", label: "Family Support" },
    { href: "/contact", label: "Contact" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/resources?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <>
      {/* Emergency Contact Banner */}
      <div className="emergency-banner px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-center sm:justify-start">
          <AlertTriangle className="h-4 w-4 text-red-800 mr-2 flex-shrink-0" />
          <span className="text-red-900 text-sm font-bold text-center sm:text-left">
            Emergency: Call 911 | Crisis Support: 988 | Poison Control: 1-800-222-1222
          </span>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <Heart className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">Recovery Path</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                    location === item.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Desktop Search */}
            <div className="hidden lg:block">
              <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </form>
            </div>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <div className="flex flex-col space-y-4 mt-6">
                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="search"
                        placeholder="Search resources..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </form>

                    {/* Mobile Navigation */}
                    <div className="flex flex-col space-y-2">
                      {navigation.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`px-3 py-2 rounded-md text-base font-medium transition-colors duration-300 ${
                            location === item.href
                              ? "text-primary bg-primary/10"
                              : "text-muted-foreground hover:text-primary hover:bg-primary/10"
                          }`}
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>

                    {/* Emergency Contacts */}
                    <div className="border-t pt-4 mt-6">
                      <h3 className="font-semibold text-foreground mb-3">Emergency Contacts</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-red-600" />
                          <span>Emergency: 911</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="h-4 w-4 text-blue-600" />
                          <span>Crisis Support: 988</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
