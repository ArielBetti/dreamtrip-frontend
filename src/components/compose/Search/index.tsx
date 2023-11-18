import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
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
        className="flex items-baseline justify-start w-full gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input
          className="max-w-md"
          placeholder={AppStrings.searchDestinationPlaceholder}
        />
        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full max-w-xs">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl className="w-full">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "pl-3 text-left font-normal w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        `${
                          field.value.from
                            ? format(field.value.from, "eee d 'de' MMM", {
                                locale: ptBR,
                              })
                            : ""
                        } - ${
                          field.value.to
                            ? format(field.value.to, "eee d 'de' MMM", {
                                locale: ptBR,
                              })
                            : ""
                        }`
                      ) : (
                        <span>{`${AppStrings.initDate} - ${AppStrings.endDate}`}</span>
                      )}
                      <CalendarIcon className="mx-2 h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={field.value}
                    onSelect={field.onChange}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>{AppStrings.selectDate}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">{AppStrings.search}</Button>
      </form>
    </Form>
  );
};

export default Search;
