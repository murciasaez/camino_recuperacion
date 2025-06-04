import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, MessageCircle, Phone, Video, Calendar, ExternalLink, Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useScrollAnimation } from "@/lib/hooks";
import { Link } from "wouter";
import type { SupportGroup } from "@shared/schema";

export default function FamilySupport() {
  useScrollAnimation();

  const { data: supportGroups } = useQuery<SupportGroup[]>({
    queryKey: ['/api/support-groups'],
  });

  const supportCategories = [
    {
      id: "caregiver",
      title: "Caregiver Self-Care",
      description: "Learn how to maintain your own physical and emotional health while supporting your loved one.",
      icon: Heart,
      color: "text-red-500",
      bgColor: "bg-red-50",
      resources: [
        "Managing caregiver stress and burnout",
        "Maintaining your own health routines",
        "Building support networks for caregivers",
        "Balancing care responsibilities with personal life"
      ]
    },
    {
      id: "communication",
      title: "Communication Strategies",
      description: "Effective techniques for talking with medical teams and supporting your loved one's emotional needs.",
      icon: MessageCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      resources: [
        "Asking the right questions to medical staff",
        "Advocating for your loved one's needs",
        "Managing difficult conversations",
        "Supporting emotional expression and processing"
      ]
    },
    {
      id: "support-groups",
      title: "Support Groups",
      description: "Connect with other families who understand your journey through virtual and local support groups.",
      icon: Users,
      color: "text-green-500",
      bgColor: "bg-green-50",
      resources: [
        "Finding the right support group for your situation",
        "What to expect from group participation",
        "Online vs. in-person support options",
        "Starting your own support network"
      ]
    }
  ];

  const practicalResources = [
    {
      title: "Hospital Navigation Guide",
      description: "Understanding hospital systems, visiting hours, and how to work with medical teams.",
      downloadUrl: "/downloads/hospital-navigation.pdf"
    },
    {
      title: "Emergency Contact Template",
      description: "Organize important contacts and medical information for quick access during emergencies.",
      downloadUrl: "/downloads/emergency-contacts.pdf"
    },
    {
      title: "Recovery Milestone Tracker",
      description: "Track progress and celebrate achievements throughout the recovery journey.",
      downloadUrl: "/downloads/milestone-tracker.pdf"
    },
    {
      title: "Family Meeting Agenda",
      description: "Structure productive family meetings about care decisions and recovery planning.",
      downloadUrl: "/downloads/family-meeting-agenda.pdf"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="recovery-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Family & Caregiver Support
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Supporting a loved one through ICU recovery requires knowledge, patience, and self-care. We're here to help you navigate this journey together.
            </p>
          </div>
        </div>
      </section>

      {/* Hero Content */}
      <section className="py-16 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  You're Not Alone in This Journey
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Caring for a loved one during ICU recovery can be overwhelming. Our comprehensive support resources 
                  are designed to help you provide the best care while taking care of yourself.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Self-Care Focus</h3>
                    <p className="text-sm text-muted-foreground">Your wellbeing matters too</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <Users className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">Community Support</h3>
                    <p className="text-sm text-muted-foreground">Connect with others who understand</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Supportive family moment"
                className="rounded-xl shadow-lg w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Categories */}
      <section className="py-16 bg-muted scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Comprehensive Family Support
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We provide support across all aspects of the family caregiver experience, from emotional wellness to practical guidance.
            </p>
          </div>

          <div className="space-y-8">
            {supportCategories.map((category, index) => {
              const Icon = category.icon;
              const isReversed = index % 2 === 1;
              
              return (
                <Card key={category.id} className="overflow-hidden">
                  <div className={`grid lg:grid-cols-2 ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
                    <div className={`p-8 ${isReversed ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center mb-4">
                        <div className={`p-3 rounded-full ${category.bgColor} mr-4`}>
                          <Icon className={`h-6 w-6 ${category.color}`} />
                        </div>
                        <h3 className="text-2xl font-bold text-foreground">{category.title}</h3>
                      </div>
                      
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {category.description}
                      </p>
                      
                      <ul className="space-y-2 mb-6">
                        {category.resources.map((resource, resourceIndex) => (
                          <li key={resourceIndex} className="flex items-start">
                            <Star className="h-4 w-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{resource}</span>
                          </li>
                        ))}
                      </ul>
                      
                      <Button className="w-full sm:w-auto">
                        Explore {category.title} Resources
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className={`${category.bgColor} p-8 flex items-center justify-center ${isReversed ? 'lg:order-1' : ''}`}>
                      <Icon className={`h-32 w-32 ${category.color} opacity-20`} />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Support Groups */}
      <section className="py-16 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Connect with Support Groups
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Join communities of families and caregivers who understand your experience and can provide mutual support and encouragement.
            </p>
          </div>

          {supportGroups && supportGroups.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {supportGroups.map((group) => {
                const getGroupIcon = (type: string) => {
                  switch (type) {
                    case 'virtual':
                      return <Video className="h-6 w-6" />;
                    case 'phone':
                      return <Phone className="h-6 w-6" />;
                    case 'local':
                      return <Users className="h-6 w-6" />;
                    default:
                      return <Users className="h-6 w-6" />;
                  }
                };

                const getTypeColor = (type: string) => {
                  switch (type) {
                    case 'virtual':
                      return 'bg-blue-100 text-blue-800';
                    case 'phone':
                      return 'bg-green-100 text-green-800';
                    case 'local':
                      return 'bg-purple-100 text-purple-800';
                    default:
                      return 'bg-gray-100 text-gray-800';
                  }
                };

                return (
                  <Card key={group.id} className="hover-lift">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="text-primary">
                          {getGroupIcon(group.type)}
                        </div>
                        <Badge className={getTypeColor(group.type)}>
                          {group.type.charAt(0).toUpperCase() + group.type.slice(1)}
                        </Badge>
                      </div>
                      <CardTitle className="text-lg">{group.name}</CardTitle>
                      <CardDescription>{group.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          <span>{group.schedule}</span>
                        </div>
                        
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MessageCircle className="h-4 w-4 mr-2" />
                          <span>{group.contactInfo}</span>
                        </div>
                        
                        {group.languages && group.languages.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {group.languages.map((language) => (
                              <Badge key={language} variant="outline" className="text-xs">
                                {language}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      
                      <Button className="w-full mt-4">
                        Join Group
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Support groups are being organized. Check back soon!</p>
            </div>
          )}
        </div>
      </section>

      {/* Practical Resources */}
      <section className="py-16 bg-muted scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Practical Tools & Resources
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Downloadable guides and templates to help you organize care, track progress, and navigate the healthcare system effectively.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {practicalResources.map((resource, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-3 p-3 rounded-full bg-primary/10">
                    <ExternalLink className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <CardDescription className="text-sm">{resource.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => window.open(resource.downloadUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Support */}
      <section className="py-16 bg-red-50 border-t border-red-200 scroll-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="border-red-200">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-red-800 flex items-center justify-center">
                <Phone className="h-6 w-6 mr-2" />
                Crisis Support Resources
              </CardTitle>
              <CardDescription className="text-red-700">
                Immediate help is available when you need it most
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Emergency Services</h4>
                  <p className="text-2xl font-bold text-red-600">911</p>
                  <p className="text-sm text-red-700">For immediate medical emergencies</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Crisis Support</h4>
                  <p className="text-2xl font-bold text-red-600">988</p>
                  <p className="text-sm text-red-700">Suicide & Crisis Lifeline</p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">Family Crisis Line</h4>
                  <p className="text-2xl font-bold text-red-600">1-800-SUPPORT</p>
                  <p className="text-sm text-red-700">24/7 family support hotline</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white scroll-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Need Personalized Support?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our family support specialists are available to provide personalized guidance and connect you with local resources tailored to your specific situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg">
                <MessageCircle className="mr-2 h-5 w-5" />
                Get Personal Support
              </Button>
            </Link>
            <Button size="lg" variant="outline">
              <Phone className="mr-2 h-5 w-5" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
