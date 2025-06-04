import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, BookOpen, Download, Star, FileText, CheckSquare } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/lib/hooks";
import ResourceCard from "@/components/resource-card";
import type { Resource } from "@shared/schema";

export default function Resources() {
  useScrollAnimation();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPhase, setSelectedPhase] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

  // Parse URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const phase = urlParams.get('phase');
    const search = urlParams.get('search');
    
    if (category) setSelectedCategory(category);
    if (phase) setSelectedPhase(phase);
    if (search) setSearchQuery(search);
  }, []);

  const { data: allResources, isLoading } = useQuery<Resource[]>({
    queryKey: ['/api/resources'],
  });

  const { data: searchResults } = useQuery<Resource[]>({
    queryKey: [`/api/search?q=${searchQuery}`],
    enabled: !!searchQuery.trim(),
  });

  const categories = [
    { id: "all", label: "Todas las Categorías", icon: BookOpen },
    { id: "symptom-guides", label: "Guías de Síntomas", icon: FileText },
    { id: "checklists", label: "Listas de Verificación", icon: CheckSquare },
    { id: "downloadable-guides", label: "Guías Descargables", icon: Download },
  ];

  const phases = [
    { id: "all", label: "Todas las Fases" },
    { id: "immediate", label: "Recuperación Inmediata" },
    { id: "short-term", label: "Recuperación a Corto Plazo" },
    { id: "long-term", label: "Recuperación a Largo Plazo" },
  ];

  const filteredResources = () => {
    let resources = searchQuery.trim() ? searchResults : allResources;
    
    if (!resources) return [];

    return resources.filter(resource => {
      const categoryMatch = selectedCategory === "all" || resource.category === selectedCategory;
      const phaseMatch = selectedPhase === "all" || resource.phase === selectedPhase;
      const featuredMatch = !showFeaturedOnly || resource.featured;
      
      return categoryMatch && phaseMatch && featuredMatch;
    });
  };

  const handleResourceClick = (resource: Resource) => {
    setLocation(`/resources/${resource.id}`);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedPhase("all");
    setShowFeaturedOnly(false);
    setSearchQuery("");
  };

  const activeFiltersCount = [
    selectedCategory !== "all",
    selectedPhase !== "all",
    showFeaturedOnly,
    searchQuery.trim()
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="recovery-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recursos Educativos
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Guías completas, listas de verificación y materiales educativos organizados por tu fase actual de recuperación y necesidades específicas.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-8 bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar recursos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={selectedPhase} onValueChange={setSelectedPhase}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Fase de Recuperación" />
                </SelectTrigger>
                <SelectContent>
                  {phases.map((phase) => (
                    <SelectItem key={phase.id} value={phase.id}>
                      {phase.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant={showFeaturedOnly ? "default" : "outline"}
                onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
                className="flex items-center"
              >
                <Star className="h-4 w-4 mr-2" />
                Destacados
              </Button>

              {activeFiltersCount > 0 && (
                <Button variant="ghost" onClick={clearFilters}>
                  Limpiar Filtros ({activeFiltersCount})
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories Overview */}
      <section className="py-12 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {categories.slice(1).map((category) => {
              const Icon = category.icon;
              const categoryResources = allResources?.filter(r => r.category === category.id) || [];
              
              return (
                <Card 
                  key={category.id} 
                  className={`hover-lift cursor-pointer transition-all ${
                    selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.label}</CardTitle>
                    <Badge variant="secondary">{categoryResources.length} recursos</Badge>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12 scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-20 bg-gray-200 rounded mb-4"></div>
                    <div className="h-8 bg-gray-200 rounded"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : filteredResources().length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  {searchQuery.trim() ? `Resultados de Búsqueda` : 'Todos los Recursos'}
                </h2>
                <Badge variant="outline" className="text-sm">
                  {filteredResources().length} {filteredResources().length === 1 ? 'recurso' : 'recursos'} encontrados
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources().map((resource) => (
                  <ResourceCard
                    key={resource.id}
                    resource={resource}
                    onClick={() => handleResourceClick(resource)}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No se encontraron recursos
              </h3>
              <p className="text-muted-foreground mb-4">
                Intenta ajustar tus términos de búsqueda o filtros para encontrar lo que buscas.
              </p>
              <Button onClick={clearFilters} variant="outline">
                Limpiar Todos los Filtros
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Resource Request CTA */}
      <section className="py-16 bg-blue-50 border-t">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our team is constantly updating our resource library. If you need specific information or resources, 
            let us know and we'll do our best to help.
          </p>
          <Button onClick={() => setLocation('/contact')} size="lg">
            Request a Resource
          </Button>
        </div>
      </section>
    </div>
  );
}
