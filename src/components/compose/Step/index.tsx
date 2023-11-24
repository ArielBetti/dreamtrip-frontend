import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IStepProps {
  step: number;
  currentStep: number;
  children: ReactNode;
  className?: string;
}

const Step = ({ className, children, currentStep, step }: IStepProps) => {
  return (
    <>
      {step >= currentStep && (
        <div
          className={cn(
            "p-0 m-0 animate-fadeIn duration-700 w-full",
            currentStep !== step ? "hidden" : "block",
            className && className
          )}
        >
          {children}
        </div>
      )}
    </>
  );
};

export default Step;
