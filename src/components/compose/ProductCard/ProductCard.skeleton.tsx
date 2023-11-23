import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import FavoriteToggle from "../FavoriteToggle";
import { StarIcon } from "lucide-react";

const ProductCardSkeleton = () => {
  return (
    <Card className="max-h-[280px] w-full md:max-w-sm flex flex-row gap-3 p-2 cursor-pointer">
      <Skeleton className="h-[160px] w-[130px] rounded-lg" />
      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <Skeleton className="max-w-[200px] w-full h-4" />
          <FavoriteToggle
            isLoading
            disabled
            onClick={() => {}}
            isFavorited={false}
          />
        </div>
        <Skeleton className="max-w-[180px] w-full h-3" />
        <Skeleton className="w-[80px] h-6 rounded-md my-1" />
        <div className="flex flex-row items-center gap-2 justify-start w-full">
          <StarIcon className="h-5 w-5 animate-pulse text-muted fill-muted" />
          <Skeleton className="max-w-[40px] w-full h-3" />
        </div>
        <div className="flex max-w-xs w-full flex-col gap-1 pt-1">
          <Skeleton className="max-w-[200px] w-full h-1" />
          <Skeleton className="max-w-[160px] w-full h-1" />
          <Skeleton className="max-w-[180px] w-full h-1" />
        </div>
      </div>
    </Card>
  );
};

export default ProductCardSkeleton;
