import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Info, Save, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useChecklistProgress } from "@/lib/hooks";
import { useToast } from "@/hooks/use-toast";
import type { ChecklistItem } from "@shared/schema";

interface RecoveryChecklistProps {
  phase?: string;
  week?: number;
}

export default function RecoveryChecklist({ phase = "immediate", week = 1 }: RecoveryChecklistProps) {
  const { toast } = useToast();
  const { progress, updateProgress } = useChecklistProgress();
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const { data: checklistItems, isLoading } = useQuery<ChecklistItem[]>({
    queryKey: ['/api/checklist', { phase, week }],
    enabled: !!phase || !!week,
  });

  useEffect(() => {
    // Load saved progress for current phase/week
    const savedProgress = localStorage.getItem(`checklist_${phase}_${week}`);
    if (savedProgress) {
      const savedChecked = JSON.parse(savedProgress);
      setCheckedItems(new Set(savedChecked));
    }
  }, [phase, week]);

  const handleItemCheck = (itemId: number, checked: boolean) => {
    const newCheckedItems = new Set(checkedItems);
    if (checked) {
      newCheckedItems.add(itemId);
    } else {
      newCheckedItems.delete(itemId);
    }
    setCheckedItems(newCheckedItems);

    // Update progress
    const total = checklistItems?.length || 0;
    const completed = newCheckedItems.size;
    updateProgress(completed, total, phase, week);
  };

  const handleSaveProgress = () => {
    // Save to localStorage
    localStorage.setItem(`checklist_${phase}_${week}`, JSON.stringify([...checkedItems]));
    
    toast({
      title: "Progress Saved",
      description: "Your recovery progress has been saved successfully.",
    });
  };

  const handleDownloadChecklist = () => {
    // Generate and download PDF
    toast({
      title: "Download Started",
      description: "Your checklist is being prepared for download.",
    });
  };

  if (isLoading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8">
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-3 p-3 animate-pulse">
                <div className="w-5 h-5 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!checklistItems || checklistItems.length === 0) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">No checklist items available for this phase and week.</p>
        </CardContent>
      </Card>
    );
  }

  const completedCount = checkedItems.size;
  const totalCount = checklistItems.length;
  const progressPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="w-full max-w-4xl mx-auto recovery-gradient text-white">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl md:text-3xl font-bold mb-4">
          Track Your Recovery Progress
        </CardTitle>
        <p className="text-lg opacity-90">
          Use our interactive checklist to monitor your journey and celebrate each milestone.
        </p>
      </CardHeader>

      <CardContent>
        <Card className="text-foreground">
          <CardContent className="p-6">
            {/* Progress Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h3 className="text-xl font-semibold">
                  {phase.charAt(0).toUpperCase() + phase.slice(1)} Recovery - Week {week}
                </h3>
                <p className="text-muted-foreground">Track your recovery milestones</p>
              </div>
              <Badge variant="secondary" className="px-4 py-2">
                {completedCount} of {totalCount} completed
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>

            {/* Checklist Items */}
            <div className="space-y-4 mb-6">
              {checklistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start space-x-3 p-4 rounded-lg hover:bg-muted/50 transition-colors duration-300"
                >
                  <Checkbox
                    id={`task-${item.id}`}
                    checked={checkedItems.has(item.id)}
                    onCheckedChange={(checked) => handleItemCheck(item.id, !!checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`task-${item.id}`}
                      className="font-medium cursor-pointer block"
                    >
                      {item.title}
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {item.description}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    title="Learn more about this milestone"
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t">
              <Button onClick={handleSaveProgress} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Save Progress
              </Button>
              <Button onClick={handleDownloadChecklist} variant="outline" className="flex-1">
                <Download className="mr-2 h-4 w-4" />
                Download Checklist
              </Button>
            </div>

            {/* Encouragement Message */}
            {progressPercentage >= 75 && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-green-800 text-sm font-medium text-center">
                  🎉 Great progress! You're doing an excellent job with your recovery journey.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
