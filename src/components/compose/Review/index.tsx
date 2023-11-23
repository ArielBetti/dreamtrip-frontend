import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMemo } from "react";
import StarRating from "../StarRating";
import { Card } from "@/components/ui/card";
import ReviewSkleton from "./Review.skleton";

export interface IReviewComponent {
  userName: string;
  userImage: string;
  review: string;
  rating: number;
  loading?: boolean;
}

const ReviewComponent = ({
  userName,
  userImage,
  review,
  rating,
  loading,
}: IReviewComponent) => {
  const userFallback = useMemo(() => {
    const [firstName, lastName] = userName.split(" ");
    const firstNameFirstLetter = firstName?.charAt(0);
    const lastNameFirstLetter = lastName?.charAt(0) || "";
    const fallbackName = `${firstNameFirstLetter} ${lastNameFirstLetter}`;

    return fallbackName.toUpperCase();
  }, [userName]);

  if (loading) {
    return <ReviewSkleton />;
  }

  return (
    <Card className="flex flex-row items-start justify-start gap-5 w-full rounded-xl p-2">
      <Avatar>
        <AvatarImage src={userImage} alt={userName} />
        <AvatarFallback delayMs={600}>{userFallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-start justify-start gap-1">
        <p className="font-semibold">{userName}</p>
        <StarRating rating={rating} />
        <p className="text-sm text-muted-foreground py-2">{review}</p>
      </div>
    </Card>
  );
};

export default ReviewComponent;
