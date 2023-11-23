import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "../ProductCard/ProductCard.skeleton";

const ProductSessionSkeleton = () => {
  return (
    <div className="flex flex-col items-start justify-start gap-3 py-3">
      <div className="flex flex-row items-center justify-start gap-3 w-full">
        <Skeleton className="h-5 w-full max-w-[140px]" />
      </div>
      <div className="flex flex-wrap gap-2 md:flex-row flex-col w-full">
        <ProductCardSkeleton />
      </div>
    </div>
  );
};

export default ProductSessionSkeleton;
