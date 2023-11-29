import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  calculeTotalPriceByDay,
  cn,
  normalizeReserveDatesString,
} from "@/lib/utils";
import { ROUTE } from "@/routes/routes";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

interface IReserveFormDTO {
  travelId: string;
  reserveDate: {
    to: Date;
    from: Date;
  };
  travelers: number;
}

interface IReserveCardProps extends IReserveFormDTO {
  maxCapacity: number;
  price: number;
  aditionalPerPerson: number;
}

export const FormCreateUserSchema = z.object({
  reserveDate: z.object({
    to: z.date(),
    from: z.date(),
  }),
  travelers: z.number().min(1),
});

const ReserveCard = ({
  reserveDate = {
    to: new Date(),
    from: new Date(),
  },
  travelId,
  travelers,
  maxCapacity,
  price,
  aditionalPerPerson,
}: IReserveCardProps) => {
  const navigate = useNavigate();
  const form = useForm<IReserveFormDTO>({
    resolver: zodResolver(FormCreateUserSchema),
    mode: "all",
    defaultValues: {
      reserveDate,
      travelers: 1,
    },
  });

  const { handleSubmit, control, watch } = form;
  const watchInstance = watch();

  const handleSubmitForm = () => {
    const { reserveDate, travelers } = watchInstance;
    const url = `${
      ROUTE.reserve
    }/${travelId}?startDate=${reserveDate.from.toISOString()}&endDate=${reserveDate.to.toISOString()}&travelers=${travelers}`;

    navigate(url);
  };
  const calculeTotalPrice = (
    price: number,
    travelers: number,
    additionalPerPerson: number
  ) => {
    if (travelers === 1) return price;
    const aditional = additionalPerPerson * travelers;

    return price + aditional;
  };

  const formatedPrice = (
    price: number,
    travelers: number,
    additionalPerPerson: number
  ) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(
      calculeTotalPriceByDay(
        calculeTotalPrice(price, travelers, additionalPerPerson),
        watchInstance?.reserveDate?.from
          ? new Date(watchInstance?.reserveDate?.from)
          : undefined,
        watchInstance?.reserveDate?.to
          ? new Date(watchInstance?.reserveDate.to)
          : undefined
      )
    );
  };

  return (
    <Card className="p-2 rounded-lg">
      <Form {...form}>
        <form
          className="w-full flex items-start justify-start flex-col gap-3"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="w-full flex items-start justify-between max-sm:flex-col gap-2">
            <div className="flex flex-col items-start justify-start">
              <p className="text-orange-500 font-semibold">
                {formatedPrice(
                  price,
                  watchInstance.travelers,
                  aditionalPerPerson
                )}{" "}
                <span className="text-muted-foreground font-normal">
                  / diária
                </span>
              </p>
              <p className="text-muted-foreground text-sm">
                {normalizeReserveDatesString(
                  watchInstance?.reserveDate?.from
                    ? new Date(watchInstance?.reserveDate?.from)
                    : undefined,
                  watchInstance?.reserveDate?.to
                    ? new Date(watchInstance?.reserveDate.to)
                    : undefined
                )}
              </p>
            </div>
            <div className="flex items-start justify-start gap-2">
              <FormField
                control={control}
                defaultValue={travelers}
                name="travelers"
                render={({ field }) => (
                  <FormItem className="block">
                    <Select
                      defaultValue="0"
                      onValueChange={(value) =>
                        field.onChange(parseInt(value) + 1)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Pessoas" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Pessoas</SelectLabel>
                          {Array.from(Array(maxCapacity)).map((_, index) => (
                            <SelectItem
                              key={`${travelId}-${index + 1}`}
                              value={index.toString()}
                            >
                              {index + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="reserveDate"
                render={({ field }) => (
                  <FormItem className="block">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[70px]",
                              field.value && "text-primary"
                            )}
                          >
                            <CalendarIcon className="mx-2 h-4 w-4" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="range"
                          selected={field.value || reserveDate}
                          fromDate={new Date()}
                          onSelect={(e) => {
                            const clonedDates = { ...e };
                            field.onChange(clonedDates);
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
              <Button>Reservar</Button>
            </div>
          </div>
          <p className="text-muted-foreground">
            Reserve agora mesmo, sem complicações de cadastro! Basta escolher
            sua data, preencher algumas informações rápidas e pronto. Sua
            reserva está feita em instantes.
          </p>
        </form>
      </Form>
    </Card>
  );
};

export default ReserveCard;
