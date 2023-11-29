import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { IReserveStepProps } from "..";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

const StepInformation = ({ control }: IReserveStepProps) => {
  return (
    <div className="flex flex-col items-start justify-start gap-2 w-full">
      <div className="flex w-full items-start justify-start gap-2 flex-col lg:flex-row">
        <FormField
          control={control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Primeiro nome</FormLabel>
              <FormControl>
                <Input
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="John"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="Due"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full lg:max-w-xs">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
                  placeholder="john.due@dreamtrip.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={control}
        name="bookingForAnother"
        render={({ field }) => (
          <FormItem className="flex flex-row items-center justify-center space-y-0 gap-2 py-2">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel>Estou fazendo a reserva para outra pessoa</FormLabel>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default StepInformation;
