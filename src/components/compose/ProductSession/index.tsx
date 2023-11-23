import { ITravelApresentation } from "@/interfaces/travel";
import { ProductCard } from "..";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/routes/routes";
import ProductSessionSkeleton from "./ProductSession.skeleton";
import axios from "axios";
import { AppStrings } from "@/strings/app.strings";
import ProductCardError from "../ProductCard/ProductCard.error";

export interface TProductSessionProps {
  travels: ITravelApresentation[];
  loading?: boolean;
  sessionName: string;
  isError: boolean;
  error: unknown;
  refecth: () => void;
}

const ProductSession = ({
  sessionName,
  travels,
  loading,
  error,
  isError,
  refecth,
}: TProductSessionProps) => {
  const navigate = useNavigate();

  if (loading) return <ProductSessionSkeleton />;

  if (isError) {
    if (axios.isAxiosError(error)) {
      const refetchError = error.status !== 400;
      return (
        <div className="py-3">
          <ProductCardError
            message={AppStrings.errorDefaultRefetch}
            onRetry={refetchError ? refecth : undefined}
          />
        </div>
      );
    }

    return (
      <div className="py-3">
        <ProductCardError message={AppStrings.errorDefaultNoRefetch} />
      </div>
    );
  }

  if (travels.length === 0) return null;

  return (
    <div className="animate-fadeIn flex flex-col items-start justify-start gap-3 py-3">
      <div className="flex flex-row items-center justify-start gap-3">
        <span className="text-lg font-semibold tracking-tight">
          {sessionName}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 md:flex-row flex-col w-full">
        {travels.map((item) => (
          <ProductCard
            id={item._id}
            onClick={() => navigate(`${ROUTE.trip}/${item._id}`)}
            price={item.price}
            rating={item?.rating || 0}
            title={item.name}
            location={item.location.city}
            description={item.description}
            image={item.image}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSession;
