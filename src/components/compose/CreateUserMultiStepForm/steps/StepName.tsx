import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ICreateUserStepProps } from "..";

const StepName = ({ control }: ICreateUserStepProps) => {
  return (
    <>
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
    </>
  );
};

export default StepName;
