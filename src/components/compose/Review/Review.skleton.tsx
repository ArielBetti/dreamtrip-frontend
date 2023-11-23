import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "lucide-react";

const ReviewSkleton = () => {
  return (
    <Card className="flex flex-row items-start justify-start gap-5 w-full rounded-xl p-2">
      <Avatar>
        <Skeleton className="h-10 w-10 rounded-full" />
      </Avatar>
      <div className="flex flex-col items-start justify-start gap-1 w-full">
        <Skeleton className="h-3 w-[100px]" />
        <div className="flex items-start justify-start">
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
        </div>
        <div className="mt-3 flex flex-col items-start justify-start w-full gap-1">
          <Skeleton className="h-2 w-[90%] " />
          <Skeleton className="h-2 w-[60%] " />
          <Skeleton className="h-2 w-[30%] " />
        </div>
      </div>
    </Card>
  );
};

export default ReviewSkleton;
