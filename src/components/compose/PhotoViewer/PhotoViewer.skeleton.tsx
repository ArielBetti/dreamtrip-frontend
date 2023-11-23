import { Skeleton } from "@/components/ui/skeleton";

const PhotoViewerSkeleton = () => {
  return (
    <div className="flex items-start justify-start gap-3">
      <Skeleton className="h-[130px] w-[130px] rounded-xl" />
      <Skeleton className="h-[130px] w-[130px] rounded-xl" />
      <Skeleton className="h-[130px] w-[130px] rounded-xl" />
    </div>
  );
};

export default PhotoViewerSkeleton;
