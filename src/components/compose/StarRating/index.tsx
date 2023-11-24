import { StarHalfIcon, StarIcon } from "lucide-react";

interface TStartRating {
  rating: number;
}

const StarRating = ({ rating }: TStartRating) => {
  const maxRating = 5;
  const currentRating = rating > maxRating ? maxRating : rating;
  const isFractional = !Number.isInteger(currentRating);

  return (
    <div className="flex items-start justify-center">
      {Array.from(Array(Math.floor(currentRating))).map((_, index, array) => {
        const lastIsFractional = index === array.length - 1 && isFractional;

        return lastIsFractional ? (
          <StarHalfIcon
            key={`start-icon-${index}`}
            className="w-5 h-5 fill-primary text-primary"
          />
        ) : (
          <StarIcon className="w-5 h-5 fill-primary text-primary" />
        );
      })}
    </div>
  );
};

export default StarRating;
