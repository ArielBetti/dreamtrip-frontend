import { IReserveStepProps } from "..";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircleIcon } from "lucide-react";
import CreditCard from "../../CreditCard";

const maxYears = 122;
const enableYears = Array.from(Array(maxYears)).map(
  (_, index) => new Date().getFullYear() + index
);

const StepPayment = ({ control, watch, register }: IReserveStepProps) => {
  const month = watch?.paymentMethod?.expirationDate?.month || 5;

  const year =
    watch?.paymentMethod?.expirationDate?.year || new Date().getFullYear();

  if (!register) return null;

  return (
    <div className="flex w-full items-start justify-start gap-2 flex-col">
      <Alert variant="default">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Atenção!</AlertTitle>
        <AlertDescription>
          Esse site é apenas um protótipo, as reservas são fictícias, não
          adicione dados reais de cartão de crédito.
        </AlertDescription>
      </Alert>
      <div className="flex w-full items-start justify-start gap-5 lg:flex-row flex-col">
        <CreditCard
          cardNumber={watch?.paymentMethod?.cardNumber || 0}
          cardholderName={watch?.paymentMethod?.cardholderName || ""}
          cvv={watch?.paymentMethod?.cvv || 0}
          expirationDate={{
            month: watch?.paymentMethod?.expirationDate?.month || 0,
            year: watch?.paymentMethod?.expirationDate?.year || 0,
          }}
          hiddenNumber={false}
        />
        <div className="flex-col items-start justify-start w-full gap-2 ">
          <div className="flex w-full items-start justify-start gap-2 pb-4">
            <FormField
              control={control}
              name="paymentMethod.cardholderName"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Titular</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="JHON DUE"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="paymentMethod.cardNumber"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Número do cartão</FormLabel>
                  <FormControl>
                    <Input
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="0000000000000000"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full items-start justify-start gap-2 max-md:flex-col">
            <FormField
              control={control}
              name="paymentMethod.expirationDate.year"
              defaultValue={year}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Ano</FormLabel>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(parseInt(e, 10));
                    }}
                    defaultValue={field?.value.toString() || year.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Ano de vencimento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {enableYears.map((yearOption, index) => (
                        <SelectItem key={index} value={yearOption.toString()}>
                          {yearOption}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              defaultValue={month}
              name="paymentMethod.expirationDate.month"
              render={({ field }) => (
                <FormItem className="w-full capitalize">
                  <FormLabel>Mês</FormLabel>
                  <Select
                    value={field.value.toString()}
                    onValueChange={(e) => {
                      field.onChange(Number(e));
                    }}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Mês de vencimento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="capitalize">
                      {Array.from({ length: 12 }, (_, index) => {
                        const monthNumber = index + 1;
                        const monthName = new Date(
                          2023,
                          monthNumber - 1,
                          1
                        ).toLocaleString("default", { month: "long" });
                        return (
                          <SelectItem
                            className="capitalize"
                            value={monthNumber.toString()}
                          >
                            {monthName}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="paymentMethod.cvv"
              defaultValue={watch?.paymentMethod?.cvv || 0}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      max={4}
                      value={field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                      placeholder="●●●"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepPayment;
