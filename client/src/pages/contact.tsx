import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Phone, Mail, MessageCircle, Video, Clock, Globe, AlertTriangle, HelpCircle, FileText, Shield } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useScrollAnimation } from "@/lib/hooks";
import { apiRequest } from "@/lib/queryClient";
import { insertContactRequestSchema } from "@shared/schema";
import type { ContactFormData } from "@/lib/types";
import { z } from "zod";

const contactFormSchema = insertContactRequestSchema.extend({
  phone: z.string().optional(),
});

export default function Contact() {
  useScrollAnimation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
      urgency: "medium",
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Mensaje Enviado Exitosamente",
        description: "Te responderemos dentro de 24 horas. Revisa tu correo para una confirmación.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/contact'] });
    },
    onError: (error: any) => {
      toast({
        title: "Error al Enviar Mensaje",
        description: error.message || "Por favor intenta de nuevo o contáctanos directamente.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await contactMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      id: "phone",
      title: "Soporte Telefónico",
      description: "Habla con un especialista en recuperación",
      contact: "(555) 123-4567",
      availability: "Lun-Vie: 8am-6pm PST",
      icon: Phone,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      action: "Llamar Ahora"
    },
    {
      id: "email",
      title: "Soporte por Email",
      description: "Envíanos tus preguntas",
      contact: "support@recoverypath.com",
      availability: "Respuesta en 24 horas",
      icon: Mail,
      color: "text-green-600",
      bgColor: "bg-green-50",
      action: "Enviar Email"
    },
    {
      id: "chat",
      title: "Chat en Vivo",
      description: "Chatea con nuestro equipo de apoyo",
      contact: "Disponible ahora",
      availability: "Lun-Vie: 9am-5pm PST",
      icon: MessageCircle,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      action: "Iniciar Chat"
    },
    {
      id: "video",
      title: "Consulta por Video",
      description: "Programa una reunión virtual",
      contact: "Sesiones de 30 minutos",
      availability: "Con cita previa",
      icon: Video,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      action: "Programar Ahora"
    }
  ];

  const quickResources = [
    {
      title: "Preguntas Frecuentes",
      description: "Encuentra respuestas a preguntas comunes sobre recuperación",
      icon: HelpCircle,
      href: "#faq"
    },
    {
      title: "Glosario de Términos Médicos",
      description: "Entiende la terminología médica y procedimientos",
      icon: FileText,
      href: "#glossary"
    },
    {
      title: "Formularios y Documentos del Paciente",
      description: "Accede a formularios y documentos importantes",
      icon: FileText,
      href: "#forms"
    },
    {
      title: "Ayuda con Seguros y Facturación",
      description: "Obtén asistencia con preguntas sobre seguros y facturación",
      icon: Shield,
      href: "#insurance"
    }
  ];

  const languages = [
    "English",
    "Español",
    "中文",
    "العربية",
    "Français",
    "Deutsch",
    "Italiano",
    "Português"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <section className="recovery-gradient text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Obtén Apoyo Cuando lo Necesites
            </h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Nuestro equipo está aquí para ayudarte a navegar tu proceso de recuperación con confianza y apoyo. Contáctanos a través de tu método preferido.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Banner */}
      <section className="emergency-banner py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <AlertTriangle className="h-5 w-5 text-red-800 mr-3 flex-shrink-0" />
            <div className="text-center">
              <p className="text-red-900 font-bold">
                Emergencia: Llama 911 | Apoyo en Crisis: 988 | Control de Venenos: 1-800-222-1222
              </p>
              <p className="text-red-800 text-sm font-semibold">
                Para emergencias médicas inmediatas o crisis de salud mental, contacta servicios de emergencia directamente
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Choose Your Preferred Contact Method
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We offer multiple ways to get in touch based on your needs and preferences. All methods are staffed by trained professionals.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              
              return (
                <Card key={method.id} className="hover-lift text-center">
                  <CardHeader>
                    <div className={`mx-auto mb-4 p-4 rounded-full ${method.bgColor}`}>
                      <Icon className={`h-8 w-8 ${method.color}`} />
                    </div>
                    <CardTitle className="text-lg">{method.title}</CardTitle>
                    <CardDescription>{method.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-foreground">{method.contact}</p>
                        <p className="text-sm text-muted-foreground flex items-center justify-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {method.availability}
                        </p>
                      </div>
                      <Button className="w-full" variant="outline">
                        {method.action}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-muted scroll-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Send Us a Message
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Fill out the form below and we'll get back to you as soon as possible. All information is kept confidential.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Form</CardTitle>
              <CardDescription>
                Please provide as much detail as possible to help us assist you effectively.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address *</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="Enter your email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input type="tel" placeholder="(555) 123-4567" {...field} />
                          </FormControl>
                          <FormDescription>
                            Optional - for urgent matters or follow-up calls
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="urgency"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Priority Level *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select priority level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="low">Low - General inquiry</SelectItem>
                              <SelectItem value="medium">Medium - Need assistance</SelectItem>
                              <SelectItem value="high">High - Urgent concern</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject *</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of your inquiry" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Please provide details about your question or concern..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Please include your current recovery phase, specific concerns, and any relevant medical information.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button
                      type="submit"
                      className="flex-1"
                      disabled={isSubmitting || contactMutation.isPending}
                    >
                      {isSubmitting || contactMutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => form.reset()}
                      className="flex-1"
                    >
                      Clear Form
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Resources */}
      <section className="py-16 bg-white scroll-animate">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Resources */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Quick Resources
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {quickResources.map((resource, index) => {
                  const Icon = resource.icon;
                  
                  return (
                    <Card key={index} className="hover-lift">
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <Icon className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                          <div>
                            <h3 className="font-semibold text-foreground mb-1">
                              {resource.title}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {resource.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Multilingual Support */}
            <div>
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="h-5 w-5 mr-2 text-primary" />
                    Multilingual Support
                  </CardTitle>
                  <CardDescription>
                    We provide resources and support in multiple languages to ensure everyone can access the care they need.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {languages.map((language) => (
                      <Badge key={language} variant="outline" className="bg-white">
                        {language}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Need support in a language not listed? Contact us and we'll arrange interpreter services.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Office Hours & Response Times */}
      <section className="py-16 bg-muted scroll-animate">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Support Hours & Response Times
            </h2>
            <p className="text-lg text-muted-foreground">
              We're committed to providing timely support when you need it most.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-primary" />
                  Office Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span>9:00 AM - 2:00 PM PST</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span>Emergency support only</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Holidays</span>
                    <span>Limited availability</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageCircle className="h-5 w-5 mr-2 text-secondary" />
                  Response Times
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">High Priority</span>
                    <Badge variant="destructive">2-4 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Medium Priority</span>
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">24 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Low Priority</span>
                    <Badge variant="secondary">48-72 hours</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Live Chat</span>
                    <Badge className="bg-green-500 hover:bg-green-600">Immediate</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
