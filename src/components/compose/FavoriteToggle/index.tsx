/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { AppStrings } from "@/strings/app.strings";
import { HeartIcon } from "lucide-react";

interface TFavoriteToggle {
  isFavorited: boolean;
  isLoading: boolean;
  disabled?: boolean;
  hasUser?: boolean;
  onClick: (e?: any) => void;
}

const FavoriteToggle = ({
  isFavorited,
  isLoading = false,
  onClick,
  disabled = false,
  hasUser = false,
}: TFavoriteToggle) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={disabled}
            className="flex items-center justify-center bg-transparent p-0 hover:bg-transparent"
            variant="ghost"
            onClick={onClick}
          >
            <HeartIcon
              className={cn(
                "h-5 w-5 fill-muted text-foreground/40 transition-colors",
                isFavorited && "fill-red-400 text-red-400",
                isLoading && "animate-pulse"
              )}
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasUser ? AppStrings.favoriteText : AppStrings.favoriteBlock}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default FavoriteToggle;
