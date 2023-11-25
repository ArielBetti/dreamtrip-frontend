import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ICreateUserStepProps } from "..";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const StepBirthday = ({ control, watch }: ICreateUserStepProps) => {
  const maxYears = 122;
  const enableYears = Array.from(Array(maxYears)).map(
    (_, index) => new Date().getFullYear() - index
  );
  const watchValues = watch;
  const day = watchValues?.birthdayDay || 2;
  const month = watchValues?.birthdayMonth || "5";
  const year = watchValues?.birthdayYear || 1999;

  return (
    <div className="flex flex-col w-full items-start justify-start gap-5">
      <h1 className="font-semibold">Data de nascimento</h1>
      <div className="flex items-baseline justify-start gap-2 w-full">
        <FormField
          control={control}
          defaultValue={day}
          name="birthdayDay"
          render={({ field }) => (
            <FormItem className="block">
              <FormLabel>Dia</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className="mt-2 space-y-2">
                      {field.value || day}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    disableNavigation
                    defaultMonth={new Date(year, parseInt(month) - 1, day)}
                    locale={ptBR}
                    month={new Date(year, parseInt(month) - 1, day)}
                    mode="single"
                    selected={
                      new Date(year, parseInt(month) - 1, field.value || day)
                    }
                    onSelect={(e) => {
                      field.onChange(e?.getDate());
                    }}
                  />
                </PopoverContent>
              </Popover>
            </FormItem>
          )}
        />
        <FormField
          control={control}
          defaultValue={month.toString()}
          name="birthdayMonth"
          render={({ field }) => (
            <FormItem className="w-full capitalize">
              <FormLabel>Mês</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                }}
                defaultValue={field.value || month.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona o mês de nascimento" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="capitalize">
                  {Array.from({ length: 12 }, (_, index) => {
                    const monthNumber = index + 1;
                    const monthName = new Date(
                      2023,
                      monthNumber - 1,
                      day
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
          name="birthdayYear"
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
                    <SelectValue placeholder="Seleciona o ano de nascimento" />
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
      </div>
      <p className="text-muted-foreground text-sm">
        {format(
          new Date(`${month}/${day}/${year}`),
          "EEE d 'de' MMMM 'em' YYY",
          {
            locale: ptBR,
          }
        )}
      </p>
    </div>
  );
};

export default StepBirthday;
