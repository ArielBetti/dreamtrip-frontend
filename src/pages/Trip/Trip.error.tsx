import { Button } from "@/components/ui/button";
import { BombIcon, RefreshCcwIcon } from "lucide-react";

interface ITripErrorProps {
  message: string;
  title: string;
  refetch?: () => void;
}

const TripError = ({ message, title, refetch }: ITripErrorProps) => {
  return (
    <div className="container m-auto px-4 h-screen w-full flex-col text-center">
      <div className="flex flex-col items-center justify-center h-full">
        {refetch ? (
          <RefreshCcwIcon className="h-12 w-12 my-3" />
        ) : (
          <BombIcon className="h-12 w-12 my-3" />
        )}
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-muted-foreground pt-2">{message}</p>
        {refetch && (
          <Button
            variant="outline"
            onClick={refetch}
            className="mt-5 font-semibold"
          >
            Tentar novamente
          </Button>
        )}
      </div>
    </div>
  );
};

export default TripError;
