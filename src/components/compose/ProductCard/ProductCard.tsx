import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import FavoriteToggle from "../FavoriteToggle";
import StarRating from "../StarRating";
import { toast } from "@/components/ui/use-toast";

export interface TProductCardProps {
  title: string;
  location?: string;
  description?: string;
  price: number;
  rating: number;
  image?: string;
  isFavorited?: boolean;
  onClick: () => void;
}

const ProductCard = ({
  title,
  location,
  isFavorited = false,
  description,
  price,
  rating,
  image,
  onClick
}: TProductCardProps) => {
  const formatedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price);

  return (
    <Card onClick={onClick} className="max-h-[280px] w-full max-w-lg flex md:flex-row flex-col gap-3 p-2 cursor-pointer">
      <div
        className={cn(
          "h-[160px] md:w-[130px] w-full rounded-lg bg-muted",
          image && "bg-cover",
          image && "bg-center",
          image && "bg-no-repeat",
        )}
        style={{ backgroundImage: `url(${image})` }}
      ></div>
      <div className="flex flex-col justify-start items-start gap-1 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h1 className="max-w-[310px] overflow-hidden truncate text-xl font-semibold m-0 p-0">
            {title}
          </h1>
          <FavoriteToggle
            isLoading={false}
            isFavorited={isFavorited}
            onClick={(e: MouseEvent) => {
              e.stopPropagation();
              toast({
                title: "Adicionado aos favoritos",
                className: "bg-green-500 text-green-900",
              });
            }}
          />
        </div>
        <span className="text-sm max-w-xs overflow-hidden truncate">
          {location}
        </span>
        <span className="text-green-800 bg-green-400 py-1 px-2 rounded-md font-bold">{formatedPrice}</span>
        <div className="flex flex-row items-center gap-2 justify-start w-full">
          <StarRating rating={rating} />
          <span className="font-semibold">{rating}</span>
        </div>
        <div className="flex max-w-xs">
          <p className="text-xs text-muted-foreground line-clamp-2">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
