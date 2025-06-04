import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, Target, Users, Clock, CheckCircle, ArrowRight, Book, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/lib/hooks";
import ResourceCard from "@/components/resource-card";
import RecoveryChecklist from "@/components/recovery-checklist";
import type { Resource } from "@shared/schema";
import type { RecoveryPhase } from "@/lib/types";

export default function RecoveryPhases() {
  useScrollAnimation();
  const [, setLocation] = useLocation();
  const [activePhase, setActivePhase] = useState("immediate");

  const phases: RecoveryPhase[] = [
    {
      id: "immediate",
      title: "Recuperación Inmediata",
      subtitle: "Primeras 48 Horas",
      description: "La primera fase crítica se enfoca en estabilización, orientación básica y comprensión de tu entorno de atención inmediata. Este período involucra monitoreo intensivo y establecimiento de comunicación con tu equipo médico.",
      duration: "0-48 horas",
      keyFocusAreas: [
        "Entender tu condición actual y plan de tratamiento",
        "Conocer y comunicarte con tu equipo de atención",
        "Orientación básica al tiempo, lugar y situación",
        "Manejo de molestias físicas inmediatas",
        "Establecer protocolos de comunicación familiar",
        "Aprender sobre equipos médicos y monitoreo"
      ],
      color: "#4A90B8",
      iconClass: "heart"
    },
    {
      id: "short-term",
      title: "Short-term Recovery",
      subtitle: "2-30 Days",
      description: "Building physical and emotional strength while developing daily routines. This phase involves active participation in therapy and preparation for longer-term recovery goals.",
      duration: "2-30 days",
      keyFocusAreas: [
        "Participating in physical and occupational therapy",
        "Managing emotional adjustment and mental health",
        "Improving family communication and support systems",
        "Developing sustainable daily routines",
        "Setting realistic short-term recovery goals",
        "Learning self-advocacy skills with medical team"
      ],
      color: "#7BB3A0",
      iconClass: "target"
    },
    {
      id: "long-term",
      title: "Long-term Recovery",
      subtitle: "1 Month and Beyond",
      description: "Focusing on returning to meaningful activities, maintaining progress, and building long-term support networks. This phase emphasizes independence and community reintegration.",
      duration: "1 month+",
      keyFocusAreas: [
        "Developing independent living skills",
        "Returning to work or meaningful activities",
        "Building and maintaining support networks",
        "Managing ongoing health and wellness",
        "Preventing complications and setbacks",
        "Advocating for continued care needs"
      ],
      color: "#F4A261",
      iconClass: "users"
    }
  ];

  const { data: phaseResources } = useQuery<Resource[]>({
    queryKey: [`/api/resources?phase=${activePhase}`],
    enabled: !!activePhase,
  });

  const getPhaseIcon = (iconClass: string) => {
    switch (iconClass) {
      case 'heart':
        return <Heart className="h-8 w-8" />;
      case 'target':
        return <Target className="h-8 w-8" />;
      case 'users':
        return <Users className="h-8 w-8" />;
      default:
        return <Clock className="h-8 w-8" />;
    }
  };

  const currentPhase = phases.find(p => p.id === activePhase);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="recovery-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Recovery Phases
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Understanding each phase of your recovery journey helps you prepare, set realistic expectations, and celebrate progress along the way.
            </p>
          </div>
        </div>
      </section>

      {/* Phase Navigation */}
      <section className="py-12 bg-white sticky top-16 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activePhase} onValueChange={setActivePhase} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {phases.map((phase) => (
                <TabsTrigger key={phase.id} value={phase.id} className="flex flex-col p-4">
                  <div className="flex items-center space-x-2">
                    {getPhaseIcon(phase.iconClass)}
                    <span className="font-semibold hidden sm:inline">{phase.title}</span>
                  </div>
                  <Badge variant="outline" className="mt-1 text-xs">
                    {phase.duration}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>

            {phases.map((phase) => (
              <TabsContent key={phase.id} value={phase.id} className="space-y-8">
                {/* Phase Overview */}
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="text-primary">
                          {getPhaseIcon(phase.iconClass)}
                        </div>
                        <div>
                          <CardTitle className="text-2xl">{phase.title}</CardTitle>
                          <CardDescription className="text-lg">{phase.subtitle}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {phase.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">
                          <Clock className="h-3 w-3 mr-1" />
                          {phase.duration}
                        </Badge>
                        <Badge variant="outline">
                          Phase {phases.findIndex(p => p.id === phase.id) + 1} of {phases.length}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Target className="h-5 w-5 mr-2 text-secondary" />
                        Key Focus Areas
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {phase.keyFocusAreas.map((area, index) => (
                          <li key={index} className="flex items-start space-x-3">
                            <CheckCircle className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                            <span className="text-sm leading-relaxed">{area}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Interactive Checklist */}
                <div className="scroll-animate">
                  <RecoveryChecklist phase={phase.id} week={1} />
                </div>

                {/* Phase Resources */}
                <div className="scroll-animate">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Book className="h-5 w-5 mr-2 text-primary" />
                        Resources for {phase.title}
                      </CardTitle>
                      <CardDescription>
                        Educational materials specifically curated for this recovery phase
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {phaseResources && phaseResources.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6">
                          {phaseResources.slice(0, 4).map((resource) => (
                            <ResourceCard
                              key={resource.id}
                              resource={resource}
                              onClick={() => setLocation(`/resources/${resource.id}`)}
                              showPhase={false}
                            />
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Book className="h-12 w-12 mx-auto mb-4 opacity-50" />
                          <p>Resources for this phase are being prepared.</p>
                          <p className="text-sm">Check back soon for updated content.</p>
                        </div>
                      )}
                      
                      {phaseResources && phaseResources.length > 4 && (
                        <div className="mt-6 text-center">
                          <Button 
                            variant="outline"
                            onClick={() => setLocation(`/resources?phase=${phase.id}`)}
                          >
                            View All {phase.title} Resources
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Tips and Encouragement */}
                <div className="scroll-animate">
                  <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-foreground mb-3 flex items-center">
                        <Heart className="h-5 w-5 mr-2 text-red-500" />
                        Remember During This Phase
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                        <div>
                          <p className="mb-2">
                            <strong>Be Patient:</strong> Recovery is a process that takes time. Every small step forward is progress worth celebrating.
                          </p>
                          <p>
                            <strong>Communicate:</strong> Don't hesitate to ask questions or voice concerns with your care team and family.
                          </p>
                        </div>
                        <div>
                          <p className="mb-2">
                            <strong>Stay Connected:</strong> Maintain relationships with family and friends who support your recovery journey.
                          </p>
                          <p>
                            <strong>Focus on Today:</strong> Take each day as it comes and focus on what you can control right now.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}
