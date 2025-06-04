import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Users, Heart, Target } from "lucide-react";
import type { RecoveryPhase } from "@/lib/types";

interface PhaseTimelineProps {
  phases: RecoveryPhase[];
  activePhase?: string;
  onPhaseSelect?: (phaseId: string) => void;
}

export default function PhaseTimeline({ phases, activePhase, onPhaseSelect }: PhaseTimelineProps) {
  const getPhaseIcon = (phaseId: string) => {
    switch (phaseId) {
      case 'immediate':
        return <Heart className="h-6 w-6" />;
      case 'short-term':
        return <Target className="h-6 w-6" />;
      case 'long-term':
        return <Users className="h-6 w-6" />;
      default:
        return <Clock className="h-6 w-6" />;
    }
  };

  const getPhaseNumber = (index: number) => index + 1;

  return (
    <div className="relative">
      {/* Timeline Line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/30 hidden lg:block"></div>
      
      <div className="space-y-12">
        {phases.map((phase, index) => {
          const isActive = activePhase === phase.id;
          const isLeft = index % 2 === 0;
          
          return (
            <div key={phase.id} className="relative">
              {/* Timeline Node */}
              <div className="absolute left-1/2 transform -translate-x-1/2 hidden lg:flex">
                <div 
                  className={`
                    progress-step w-12 h-12 rounded-full flex items-center justify-center font-bold text-white z-10
                    ${isActive ? 'active' : ''}
                  `}
                  style={{ backgroundColor: phase.color }}
                >
                  {getPhaseNumber(index)}
                </div>
              </div>

              {/* Phase Content */}
              <div className={`grid lg:grid-cols-2 gap-8 items-center ${isLeft ? '' : 'lg:flex-row-reverse'}`}>
                {/* Phase Card */}
                <div className={`${isLeft ? 'lg:pr-8' : 'lg:pl-8 lg:col-start-2'}`}>
                  <Card className={`hover-lift ${isActive ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-6">
                      {/* Mobile Timeline Node */}
                      <div className="flex items-center mb-4 lg:hidden">
                        <div 
                          className="progress-step w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-4"
                          style={{ backgroundColor: phase.color }}
                        >
                          {getPhaseNumber(index)}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {phase.duration}
                        </Badge>
                      </div>

                      <div className="flex items-center mb-4">
                        <div className="text-primary mr-3">
                          {getPhaseIcon(phase.id)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">
                            {phase.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {phase.subtitle}
                          </p>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4">
                        {phase.description}
                      </p>

                      <div className="mb-4">
                        <img
                          src={`https://images.unsplash.com/photo-${phase.id === 'immediate' ? '1559757148-5c350d0d3c56' : phase.id === 'short-term' ? '1559757175-0eb30cd8c063' : '1581056771107-24ca5f033842'}?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200`}
                          alt={`${phase.title} visualization`}
                          className="rounded-lg w-full h-32 object-cover"
                        />
                      </div>

                      {onPhaseSelect && (
                        <Button
                          onClick={() => onPhaseSelect(phase.id)}
                          variant="outline"
                          className="w-full"
                        >
                          Learn More
                          <CheckCircle className="ml-2 h-4 w-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Key Focus Areas */}
                <div className={`${isLeft ? 'lg:pl-8 lg:col-start-2' : 'lg:pr-8'}`}>
                  <Card className="bg-muted">
                    <CardContent className="p-6">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <Target className="h-4 w-4 mr-2 text-secondary" />
                        Key Focus Areas:
                      </h4>
                      <ul className="space-y-2">
                        {phase.keyFocusAreas.map((area, areaIndex) => (
                          <li key={areaIndex} className="flex items-start text-sm">
                            <CheckCircle className="h-4 w-4 text-secondary mr-2 mt-0.5 flex-shrink-0" />
                            <span>{area}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {/* Desktop Duration Badge */}
                      <div className="hidden lg:block mt-4">
                        <Badge variant="outline" className="text-xs">
                          <Clock className="h-3 w-3 mr-1" />
                          {phase.duration}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
