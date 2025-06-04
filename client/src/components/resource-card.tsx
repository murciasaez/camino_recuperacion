import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, ExternalLink, Star } from "lucide-react";
import type { Resource } from "@shared/schema";

interface ResourceCardProps {
  resource: Resource;
  onClick?: () => void;
  showPhase?: boolean;
}

export default function ResourceCard({ resource, onClick, showPhase = true }: ResourceCardProps) {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'symptom-guides':
        return <FileText className="h-5 w-5" />;
      case 'downloadable-guides':
        return <Download className="h-5 w-5" />;
      case 'checklists':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'symptom-guides':
        return 'bg-blue-100 text-blue-800 hover:bg-blue-200';
      case 'downloadable-guides':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'checklists':
        return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'immediate':
        return 'bg-red-100 text-red-800';
      case 'short-term':
        return 'bg-yellow-100 text-yellow-800';
      case 'long-term':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatPhase = (phase: string) => {
    return phase
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('-');
  };

  return (
    <Card className="hover-lift cursor-pointer h-full flex flex-col">
      <CardHeader className="flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-primary">
              {getCategoryIcon(resource.category)}
            </div>
            {resource.featured && (
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Badge className={getCategoryColor(resource.category)}>
              {formatCategory(resource.category)}
            </Badge>
            {showPhase && (
              <Badge variant="outline" className={getPhaseColor(resource.phase)}>
                {formatPhase(resource.phase)}
              </Badge>
            )}
          </div>
        </div>
        <CardTitle className="text-lg font-semibold line-clamp-2">
          {resource.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {resource.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-grow flex flex-col justify-end">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            onClick={onClick}
            variant="default"
            className="flex-1"
          >
            <span>Read More</span>
            <ExternalLink className="ml-2 h-4 w-4" />
          </Button>
          
          {resource.downloadUrl && (
            <Button
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                // Handle download
                window.open(resource.downloadUrl, '_blank');
              }}
            >
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
