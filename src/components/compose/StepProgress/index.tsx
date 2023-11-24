import { cn } from "@/lib/utils";

interface IStepProgressProps {
  totalSteps: number;
  currentStep: number;
  completeAll?: boolean;
}

const StepProgress = ({
  currentStep,
  completeAll,
  totalSteps,
}: IStepProgressProps) => {
  return (
    <div className="flex flex-row items-start justify-start gap-2">
      {Array.from(Array(totalSteps)).map((_, index) => {
        const isPainted = index + 1 <= currentStep;
        const isCurrent = index + 1 === currentStep;

        return (
          <div
            key={`step-progress-${index}-${new Date().getTime()}`}
            className={cn(
              "w-full h-1 bg-muted rounded-md transition-all border border-transparent duration-500",
              completeAll && "bg-primary",
              isCurrent && "border border-primary",
              isPainted && !isCurrent && "bg-primary"
            )}
          />
        );
      })}
    </div>
  );
};

export default StepProgress;
