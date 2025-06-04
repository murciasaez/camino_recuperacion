import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, FileText, Download, CheckSquare, Star, Heart, Users, Target } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/lib/hooks";
import RecoveryChecklist from "@/components/recovery-checklist";
import PhaseTimeline from "@/components/phase-timeline";
import type { Resource } from "@shared/schema";
import type { RecoveryPhase, ResourceCategory } from "@/lib/types";

export default function Home() {
  useScrollAnimation();

  const { data: featuredResources } = useQuery<Resource[]>({
    queryKey: ['/api/resources?featured=true'],
  });

  const recoveryPhases: RecoveryPhase[] = [
    {
      id: "immediate",
      title: "Recuperación Inmediata",
      subtitle: "0-48 horas",
      description: "Enfoque en estabilización, orientación básica y comprensión de tu equipo de atención inmediata.",
      duration: "0-48 horas",
      keyFocusAreas: [
        "Entender tu condición",
        "Conocer a tu equipo de atención",
        "Estrategias básicas de comunicación",
        "Manejo de síntomas inmediatos"
      ],
      color: "#4A90B8",
      iconClass: "fas fa-heart-pulse"
    },
    {
      id: "short-term",
      title: "Recuperación a Corto Plazo",
      subtitle: "2-30 días",
      description: "Desarrollar fuerza, establecer rutinas y prepararse para la siguiente fase de recuperación.",
      duration: "2-30 días",
      keyFocusAreas: [
        "Metas de terapia física",
        "Ajuste emocional",
        "Comunicación familiar",
        "Desarrollo de rutinas diarias"
      ],
      color: "#7BB3A0",
      iconClass: "fas fa-chart-line"
    },
    {
      id: "long-term",
      title: "Recuperación a Largo Plazo",
      subtitle: "1 mes+",
      description: "Retorno a actividades diarias, apoyo continuo y mantenimiento de los logros obtenidos.",
      duration: "1 mes+",
      keyFocusAreas: [
        "Habilidades de vida independiente",
        "Reintegración comunitaria",
        "Redes de apoyo continuas",
        "Manejo de salud a largo plazo"
      ],
      color: "#F4A261",
      iconClass: "fas fa-home"
    }
  ];

  const resourceCategories: ResourceCategory[] = [
    {
      id: "symptom-guides",
      title: "Guías de Síntomas",
      description: "Explicaciones detalladas de síntomas comunes con ayudas visuales y estrategias de manejo.",
      iconClass: "fas fa-file-medical",
      count: 12,
      color: "primary"
    },
    {
      id: "checklists",
      title: "Listas de Verificación",
      description: "Listas paso a paso para seguir el progreso y asegurar que no pierdas hitos importantes.",
      iconClass: "fas fa-tasks",
      count: 8,
      color: "secondary"
    },
    {
      id: "downloadable-guides",
      title: "Guías Descargables",
      description: "Guías completas en PDF que puedes imprimir y compartir con tu equipo médico y familia.",
      iconClass: "fas fa-download",
      count: 15,
      color: "accent"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative recovery-gradient text-white py-20 scroll-animate">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Tu Camino hacia la Recuperación Comienza Aquí
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Recursos educativos curados por expertos para guiar a pacientes de UCI en recuperación y sus familias a través de cada fase de sanación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recovery-phases">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
                  Comienza tu Camino de Recuperación
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold">
                  Explorar Recursos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Phases Overview */}
      <section className="py-20 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Fases de Recuperación
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entender tu proceso de recuperación te ayuda a prepararte para cada fase y celebrar el progreso en el camino.
            </p>
          </div>

          <PhaseTimeline phases={recoveryPhases} />
        </div>
      </section>

      {/* Resource Library Preview */}
      <section className="py-20 bg-muted scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Recursos Educativos
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Guías completas, listas de verificación y materiales educativos organizados por tu fase actual de recuperación.
            </p>
          </div>

          {/* Resource Categories */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {resourceCategories.map((category) => {
              const Icon = category.id === 'symptom-guides' ? FileText : 
                          category.id === 'checklists' ? CheckSquare : Download;
              
              return (
                <Card key={category.id} className="hover-lift">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                    <CardDescription>{category.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Link href={`/resources?category=${category.id}`}>
                      <Button className="w-full">
                        Ver Recursos ({category.count})
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Featured Resources */}
          {featuredResources && featuredResources.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <Star className="h-6 w-6 text-yellow-500 mr-3" />
                  Destacados de la Semana
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {featuredResources.slice(0, 2).map((resource) => (
                    <div key={resource.id} className="flex items-start space-x-4">
                      <Star className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">
                          {resource.title}
                        </h4>
                        <p className="text-muted-foreground text-sm mb-2">
                          {resource.description}
                        </p>
                        <Link href={`/resources/${resource.id}`}>
                          <Button variant="link" className="p-0 h-auto text-primary">
                            Leer Más <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Interactive Recovery Checklist */}
      <section className="py-20 scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RecoveryChecklist phase="immediate" week={1} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white scroll-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Obtén Apoyo Cuando lo Necesites
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Nuestro equipo está aquí para ayudarte a navegar tu camino de recuperación con confianza y apoyo.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">Apoyo 24/7</CardTitle>
                <CardDescription>Asistencia las 24 horas cuando más lo necesites</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                <CardTitle className="text-lg">Orientación Experta</CardTitle>
                <CardDescription>Profesionales médicos y especialistas en recuperación</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">Atención Personalizada</CardTitle>
                <CardDescription>Recursos adaptados a tu fase de recuperación</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contactar Equipo de Apoyo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
