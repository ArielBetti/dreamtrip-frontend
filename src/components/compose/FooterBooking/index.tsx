import { Button } from "@/components/ui/button";

export interface IFooterBooking {
  price: number;
  onClick: () => void;
}

const FooterBooking = ({ onClick, price }: IFooterBooking) => {
  const formatedPrice = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(price);

  return (
    <div className="w-full border-t-2 bg-background border-t-muted fixed bottom-0 left-0 py-2 z-50 shadow-sm">
      <div className="container m-auto px-4 flex items-center justify-between w-full">
        <p className="text-orange-500 font-semibold">
          {formatedPrice}{" "}
          <span className="text-muted-foreground font-normal">/ diária</span>
        </p>
        <Button className="font-semibold" onClick={onClick}>
          Reservar
        </Button>
      </div>
    </div>
  );
};

export default FooterBooking;
