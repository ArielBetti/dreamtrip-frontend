import PhotoViewerSkeleton from "@/components/compose/PhotoViewer/PhotoViewer.skeleton";
import ReviewSkleton from "@/components/compose/Review/Review.skleton";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "lucide-react";

const TripSkeleton = () => {
  return (
    <div className="container m-auto px-4 py-20 flex flex-col md:flex-row items-start justify-start gap-5 w-full">
      <div className="animate-fadeIn flex flex-col items-start justify-start gap-5 overflow-hidden w-full">
        <Skeleton className="w-full h-[400px] rounded-2xl" />
        <Skeleton className="h-5 w-[130px]" />
        <PhotoViewerSkeleton />
      </div>
      <Card className="animate-downSlide flex flex-col items-start justify-start gap-4 h-full min-h-[770px] md:max-h-[770px] max-w-full rounded-xl p-2 w-full">
        <Skeleton className="h-4 w-[200px] rounded-lg" />
        <div className="scroll-container flex gap-2 max-w-[300px]">
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-32 rounded-lg" />
          <Skeleton className="h-8 w-32 rounded-lg" />
        </div>
        <Skeleton className="h-3 w-[100px]" />
        <div className="flex flex-col items-start justify-start gap-2 w-full">
          <Skeleton className="h-2 w-[90%]" />
          <Skeleton className="h-2 w-[90%]" />
          <Skeleton className="h-2 w-[70%]" />
          <Skeleton className="h-2 w-[40%]" />
        </div>
        <Skeleton className="h-3 w-[100px]" />
        <div className="flex items-center justify-start w-full gap-1">
          <Skeleton className="h-3 w-[120px]" />
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
          <StarIcon className="animate-pulse w-5 h-5 text-muted fill-muted" />
        </div>
        <div className="flex flex-col gap-3 w-full">
          <ReviewSkleton />
          <ReviewSkleton />
          <ReviewSkleton />
        </div>
      </Card>
    </div>
  );
};

export default TripSkeleton;
