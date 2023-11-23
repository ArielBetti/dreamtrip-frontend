import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { DateRange } from "react-day-picker";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { AppStrings } from "@/strings/app.strings";
import { useState } from "react";

interface TSearchProps {
  onSubmitForm: (search: string, startDate: Date, endDate: Date) => void;
}

type TFormData = {
  search: string;
  dates: DateRange;
};

const FormSchema = z.object({
  search: z.string().min(1, {
    message: AppStrings.requiredSearchError,
  }),
  dates: z.object(
    {
      from: z.date({
        description: "Start date",
        required_error: AppStrings.requiredDateError,
      }),
      to: z.date({
        description: "End date",
        required_error: AppStrings.requiredDateError,
      }),
    },
    {
      required_error: AppStrings.requiredDateError,
    }
  ),
});

const Search = ({ onSubmitForm }: TSearchProps) => {
  const [textDate, setTextDate] = useState<string>(AppStrings.selectDate);

  const form = useForm<TFormData>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: TFormData) {
    onSubmitForm(
      data.search,
      new Date(data?.dates.from || ""),
      new Date(data?.dates.to || "")
    );
  }

  return (
    <Form {...form}>
      <form
        className="flex items-baseline justify-start w-full gap-2 flex-col py-5"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-2 items-center justify-start">
          <FormField
            control={form.control}
            name="search"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  onChange={(e) => field.onChange(e.target.value)}
                  className="w-full"
                  placeholder={AppStrings.searchDestinationPlaceholder}
                />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <div className="flex items-center justify-start gap-2">
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[70px] text-muted-foreground",
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
                        selected={field.value}
                        onSelect={(e) => {
                          const clonedDates = { ...e };
                          field.onChange(clonedDates);
                          const selectedDate =
                            e?.from || e?.to
                              ? `${
                                  e.from
                                    ? format(e.from, "eee d 'de' MMM", {
                                        locale: ptBR,
                                      })
                                    : ""
                                } - ${
                                  e.to
                                    ? format(e.to, "eee d 'de' MMM", {
                                        locale: ptBR,
                                      })
                                    : ""
                                }`
                              : `${AppStrings.initDate} - ${AppStrings.endDate}`;
                          setTextDate(selectedDate);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </FormItem>
              </div>
            )}
          />
          <Button type="submit">
            <SearchIcon className="mx-2 h-4 w-4 opacity-50" />
          </Button>
        </div>
        <div className="flex flex-col items-start justify-start">
          {form.formState.errors.dates?.from?.message && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.dates.from.message}
            </p>
          )}
          {form.formState.errors.dates?.to?.message && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.dates.to.message}
            </p>
          )}
          {form.formState.errors?.search?.message && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.search.message}
            </p>
          )}
          {form.formState.errors.dates?.message && (
            <p className="text-red-500 text-sm">
              {form.formState.errors.dates.message}
            </p>
          )}
        </div>
        <p className="text-muted-foreground text-sm">{textDate}</p>
      </form>
    </Form>
  );
};

export default Search;
