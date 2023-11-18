import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TProductCardProps {
  title: string;
  location?: string;
  description?: string;
  price: number;
  rating: number;
  image?: string;
  isFavorited?: boolean;
}

const ProductCard = ({
  title,
  location,
  isFavorited,
  description,
  price,
  rating,
  image,
}: TProductCardProps) => {
  return (
    <Card className="h-[180px] w-full max-w-lg flex flex-row gap-3 p-2 cursor-pointer">
      <div
        className={cn(
          "h-[160px] w-[150px] rounded-lg bg-cover",
          image && `bg-[url('${image}')]`
        )}
      ></div>
      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="max-w-xs overflow-hidden truncate text-xl font-semibold m-0 p-0">
            {title}
          </h1>
          {isFavorited}
        </div>
        <span className="text-sm max-w-xs overflow-hidden truncate">
          {location}
        </span>
        <span className="text-orange-500">{price}</span>
        <div className="flex flex-row items-center gap-2 justify-start w-full">
          <span className="font-semibold">{rating}</span>
          <span className="font-semibold">{rating}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </Card>
  );
};

export default ProductCard;
