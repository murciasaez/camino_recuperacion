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
      title: "Immediate Recovery",
      subtitle: "0-48 hours",
      description: "Focus on stabilization, basic orientation, and understanding your immediate care team.",
      duration: "0-48 hours",
      keyFocusAreas: [
        "Understanding your condition",
        "Meeting your care team",
        "Basic communication strategies",
        "Managing immediate symptoms"
      ],
      color: "#4A90B8",
      iconClass: "fas fa-heart-pulse"
    },
    {
      id: "short-term",
      title: "Short-term Recovery",
      subtitle: "2-30 days",
      description: "Building strength, developing routines, and preparing for the next phase of recovery.",
      duration: "2-30 days",
      keyFocusAreas: [
        "Physical therapy goals",
        "Emotional adjustment",
        "Family communication",
        "Developing daily routines"
      ],
      color: "#7BB3A0",
      iconClass: "fas fa-chart-line"
    },
    {
      id: "long-term",
      title: "Long-term Recovery",
      subtitle: "1 month+",
      description: "Returning to daily activities, ongoing support, and maintaining progress gains.",
      duration: "1 month+",
      keyFocusAreas: [
        "Independent living skills",
        "Community reintegration",
        "Ongoing support networks",
        "Long-term health management"
      ],
      color: "#F4A261",
      iconClass: "fas fa-home"
    }
  ];

  const resourceCategories: ResourceCategory[] = [
    {
      id: "symptom-guides",
      title: "Symptom Guides",
      description: "Detailed explanations of common symptoms with visual aids and management strategies.",
      iconClass: "fas fa-file-medical",
      count: 12,
      color: "primary"
    },
    {
      id: "checklists",
      title: "Recovery Checklists",
      description: "Step-by-step checklists to track progress and ensure you don't miss important milestones.",
      iconClass: "fas fa-tasks",
      count: 8,
      color: "secondary"
    },
    {
      id: "downloadable-guides",
      title: "Downloadable Guides",
      description: "Comprehensive PDF guides you can print and share with your care team and family.",
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
              Your Journey to Recovery Starts Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Expert-curated educational resources to guide ICU recovery patients and families through every phase of healing.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/recovery-phases">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-semibold">
                  Start Your Recovery Journey
                </Button>
              </Link>
              <Link href="/resources">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-semibold">
                  Browse Resources
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
              Recovery Phases
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Understanding your recovery journey helps you prepare for each phase and celebrate progress along the way.
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
              Educational Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive guides, checklists, and educational materials organized by your current recovery phase.
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
                        View Resources ({category.count})
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
                  Featured This Week
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
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
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
            Get Support When You Need It
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help you navigate your recovery journey with confidence and support.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Heart className="h-8 w-8 text-primary mx-auto mb-2" />
                <CardTitle className="text-lg">24/7 Support</CardTitle>
                <CardDescription>Round-the-clock assistance when you need it most</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Users className="h-8 w-8 text-secondary mx-auto mb-2" />
                <CardTitle className="text-lg">Expert Guidance</CardTitle>
                <CardDescription>Medical professionals and recovery specialists</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-lift">
              <CardHeader className="text-center">
                <Target className="h-8 w-8 text-accent mx-auto mb-2" />
                <CardTitle className="text-lg">Personalized Care</CardTitle>
                <CardDescription>Resources tailored to your recovery phase</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="mt-8">
            <Link href="/contact">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Contact Support Team
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
