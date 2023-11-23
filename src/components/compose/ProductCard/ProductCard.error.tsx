import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCwIcon, XCircleIcon } from "lucide-react";
export interface IProductCardErrorProps {
  message?: string;
  onRetry?: () => void;
}

const ProductCardError = ({ message, onRetry }: IProductCardErrorProps) => {
  return (
    <Card className="h-[170px] w-full md:max-w-sm flex flex-col items-center justify-center gap-5 p-2 bg-red-500 text-red-950 font-semibold text-center">
      <div className="flex flex-col items-center justify-center gap-2">
        {onRetry ? (
          <RefreshCwIcon className="h-8 w-8 text-red-950" />
        ) : (
          <XCircleIcon className="h-8 w-8 text-red-950" />
        )}
        <p>{message}</p>
      </div>

      <Button variant="ghost" className="font-semibold" onClick={onRetry}>
        Tentar novamente
      </Button>
    </Card>
  );
};

export default ProductCardError;
