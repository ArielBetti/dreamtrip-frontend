import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/components/ui/use-toast";
import { DateRange } from "react-day-picker";
import format from "date-fns/format";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";
import { AppStrings } from "@/strings/app.strings";
import { useState } from "react";

type TFormData = {
  dates: DateRange;
};

const FormSchema = z.object({
  dates: z.object({
    from: z.date({
      required_error: "Please select a start date",
    }),
    to: z.date({
      required_error: "Please select a end date",
    }),
  }),
});

const Search = () => {
  const [textDate, setTextDate] = useState<String>(AppStrings.selectDate);

  const form = useForm<TFormData>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: TFormData) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        className="flex items-baseline justify-start w-full gap-2 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="w-full flex gap-2 items-center justify-start max-w-xl">
          <FormField
            control={form.control}
            name="dates"
            render={({ field }) => (
              <div className="flex items-center justify-start gap-2 w-full">
                <FormItem className="w-full">
                  <Input
                    className="max-w-md"
                    placeholder={AppStrings.searchDestinationPlaceholder}
                  />
                </FormItem>
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl className="w-full">
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[70px]",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mx-2 h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        selected={field.value}
                        onSelect={(e) => {
                          field.onChange(e)
                          const selectedDate = e?.from || e?.to ? (
                            `${e.from
                              ? format(e.from, "eee d 'de' MMM", {
                                locale: ptBR,
                              })
                              : ""
                            } - ${e.to
                              ? format(e.to, "eee d 'de' MMM", {
                                locale: ptBR,
                              })
                              : ""
                            }`
                          ) : (
                            `${AppStrings.initDate} - ${AppStrings.endDate}`
                          );
                          setTextDate(selectedDate);
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              </div>
            )}
          />
          <Button type="submit"><SearchIcon className="mx-2 h-4 w-4 opacity-50" /></Button>
        </div>
        <p className="text-muted-foreground text-sm">{textDate}</p>
      </form>
    </Form>
  );
};

export default Search;
